import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK with AI Studio telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory cache for ultra-fast instant playback & saving quota
const ttsCache = new Map<string, { audioData: string; mimeType: string }>();

// Phonetics normalization for natural Vietnamese chemical and story pronunciation
function normalizeTextForVietnameseSpeech(rawText: string): string {
  if (!rawText) return '';
  let text = rawText
    .replace(/[🌸🌹☀️⭐💖🧚‍♀️👧👩‍🏫🚀💡🤝🎯⏰★📥🔄⛶✨]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Map English chemical terms to natural Vietnamese phonetic equivalents
  const chemWordMap: Record<string, string> = {
    'Hydrogen': 'Hi-đrô',
    'Oxygen': 'Ô-xy',
    'Sodium': 'Na-tri',
    'Potassium': 'Ka-li',
    'Calcium': 'Can-xi',
    'Magnesium': 'Ma-nhê',
    'Aluminium': 'Nhôm',
    'Iron': 'Sắt',
    'Lead': 'Chì',
    'Copper': 'Đồng',
    'Silver': 'Bạc',
    'Gold': 'Vàng',
    'acid': 'a-xít',
    'Hydrochloric': 'Hai-đrô-cờ-lo-ríc',
    'AgNO3': 'Bạc Ni-tơ-rát',
    'NaOH': 'Na-tri Hi-đrô-xít',
    'Cu(NO3)2': 'Đồng Ni-tơ-rát',
    'HCl': 'A-xít Hát Xê Lờ',
    'H2': 'Khí Hi-đrô',
  };

  for (const [key, val] of Object.entries(chemWordMap)) {
    const reg = new RegExp(`\\b${key}\\b`, 'gi');
    text = text.replace(reg, val);
  }

  // Map elemental symbols
  const symbolMap: Record<string, string> = {
    'Na': 'Natri',
    'Fe': 'Sắt',
    'Cu': 'Đồng',
    'Ag': 'Bạc',
    'Au': 'Vàng',
    'K': 'Kali',
    'Ca': 'Canxi',
    'Mg': 'Magie',
    'Al': 'Nhôm',
    'Zn': 'Kẽm',
    'Pb': 'Chì',
    'H': 'Hi-đrô',
  };

  const symbolReg = /\b(Na|Fe|Cu|Ag|Au|K|Ca|Mg|Al|Zn|Pb|H)\b/g;
  text = text.replace(symbolReg, (m) => symbolMap[m] || m);

  return text;
}

// Convert headerless PCM16 to valid WAV with 44-byte header if needed
function pcm16ToWavBuffer(pcmBuffer: Buffer, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const wavHeader = Buffer.alloc(44);

  wavHeader.write('RIFF', 0);
  wavHeader.writeUInt32LE(36 + pcmBuffer.length, 4);
  wavHeader.write('WAVE', 8);
  wavHeader.write('fmt ', 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20); // PCM
  wavHeader.writeUInt16LE(numChannels, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE(byteRate, 28);
  wavHeader.writeUInt16LE(blockAlign, 32);
  wavHeader.writeUInt16LE(16, 34); // 16-bit
  wavHeader.write('data', 36);
  wavHeader.writeUInt32LE(pcmBuffer.length, 40);

  return Buffer.concat([wavHeader, pcmBuffer]);
}

// API endpoint for direct AI Studio Gemini TTS with voice "Leda"
app.post('/api/tts', async (req, res) => {
  try {
    const { text, speaker = 'fairy' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const normalizedText = normalizeTextForVietnameseSpeech(text);
    const cacheKey = `leda_${speaker}_${normalizedText}`;

    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      return res.json({
        audioData: cached.audioData,
        mimeType: cached.mimeType,
        cached: true,
      });
    }

    const styleInstruction = speaker === 'child'
      ? 'Đọc bằng tiếng Việt giọng bé gái miền Bắc Việt Nam, âm điệu Hà Nội tự nhiên, trong trẻo, hồn nhiên, lễ phép, ấm áp.'
      : 'Đọc bằng tiếng Việt giọng nữ chuẩn Hà Nội, miền Bắc Việt Nam, tự nhiên, ngọt ngào, dịu dàng, truyền cảm, ấm áp, truyền cảm hứng cho học sinh như cô giáo hoặc cô tiên.';

    // Generate speech using Gemini 3.8 Flash Lite TTS with prebuilt voice "Leda"
    let response: any;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: normalizedText,
                speechMetadata: {
                  style: styleInstruction,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Leda' },
            },
          },
        },
      });
    } catch (modelErr: any) {
      console.warn('Fallback to gemini-3.8-flash-tts:', modelErr?.message);
      // Fallback to gemini-3.8-flash-tts
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: normalizedText,
                speechMetadata: {
                  style: styleInstruction,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Leda' },
            },
          },
        },
      });
    }

    const candidate = response.candidates?.[0];
    const part = candidate?.content?.parts?.[0];
    let base64Data = part?.inlineData?.data;
    let mimeType = part?.inlineData?.mimeType || 'audio/wav';

    if (!base64Data) {
      throw new Error('Không nhận được dữ liệu âm thanh từ mô hình Gemini.');
    }

    // If mimeType says audio/pcm or audio/l16 or lacks RIFF header, ensure WAV container
    const rawBuffer = Buffer.from(base64Data, 'base64');
    let finalBuffer: Buffer = rawBuffer;

    if (mimeType.includes('pcm') || mimeType.includes('l16') || !rawBuffer.subarray(0, 4).equals(Buffer.from('RIFF'))) {
      const sampleRateMatch = mimeType.match(/rate=(\d+)/);
      const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
      finalBuffer = Buffer.from(pcm16ToWavBuffer(rawBuffer, sampleRate));
      mimeType = 'audio/wav';
      base64Data = finalBuffer.toString('base64');
    }

    const dataUrl = `data:${mimeType};base64,${base64Data}`;
    ttsCache.set(cacheKey, { audioData: dataUrl, mimeType });

    return res.json({
      audioData: dataUrl,
      mimeType,
      cached: false,
    });
  } catch (err: any) {
    console.error('Lỗi Gemini TTS:', err);
    return res.status(500).json({
      error: err?.message || 'Lỗi tạo giọng nói từ AI Studio',
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (dev: ${isDev})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

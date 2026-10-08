import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  RotateCcw,
  Maximize2,
  Minimize2,
  Settings,
  Sparkles,
  Heart,
  Award,
  Clock,
  Download,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Play,
  Share2,
} from 'lucide-react';

interface Team {
  id: number;
  name: string;
  score: number;
  color: string;
  textColor: string;
  badge: string;
}

interface QuestionOption {
  text: string;
  correct: boolean;
  explain: string;
}

interface Task {
  teamIndex: number;
  question: string;
  options: QuestionOption[];
}

interface RoundData {
  time: string;
  location: string;
  description: string;
  tasks: Task[];
}

// Data according to Vietnam Middle School KHTN Grade 9 - Lesson 19 (Chemical Reactivity Series)
const ROUNDS_DATA: Record<string, RoundData> = {
  round1: {
    time: '06:30 - Buổi Sáng',
    location: 'Nhà bếp & Phòng ăn sáng gia đình',
    description: 'Bé An thức dậy trong vai Mẹ, bắt đầu sắp xếp đồ dùng gia đình và quan sát các vật dụng bằng kim loại trong bếp.',
    tasks: [
      {
        teamIndex: 0,
        question: "Mẹ dặn: 'Đồ dùng bằng sắt (như dao gọt, đinh gắn giá kệ) để lâu trong không khí ẩm dễ bị gỉ sét, trong khi trang sức vàng, bạc mẹ đeo thì luôn sáng bóng.' Hiện tượng này chứng tỏ điều gì về hoạt động hoá học?",
        options: [
          { text: "A. Sắt hoạt động hoá học mạnh hơn vàng và bạc", correct: true, explain: "Chính xác! Sắt dễ bị oxi hoá trong không khí ẩm, còn Ag, Au là kim loại hoạt động hoá học rất yếu, không bị gỉ." },
          { text: "B. Vàng và bạc hoạt động hoá học mạnh hơn sắt", correct: false, explain: "Chưa đúng. Vàng và bạc rất bền trong không khí vì hoạt động hoá học yếu." },
          { text: "C. Tất cả kim loại đều có khả năng phản ứng giống hệt nhau", correct: false, explain: "Chưa đúng. Mỗi kim loại có mức độ hoạt động hoá học khác nhau." },
        ],
      },
      {
        teamIndex: 1,
        question: "Trong thí nghiệm ở tài liệu SGK, khi cho một mẩu kim loại Natri (Na) bằng hạt đậu xanh vào chậu nước ở nhiệt độ thường, hiện tượng xảy ra là gì?",
        options: [
          { text: "A. Mẩu Na chìm nghỉm dưới đáy và không có phản ứng gì", correct: false, explain: "Chưa đúng. Natri phản ứng rất mãnh liệt với nước ở nhiệt độ thường." },
          { text: "B. Mẩu Na nóng chảy thành giọt tròn, chạy trên mặt nước và có khí thoát ra", correct: true, explain: "Rất chuẩn! Kim loại Na hoạt động rất mạnh, tác dụng với nước sinh ra NaOH và khí Hydrogen (H2)." },
          { text: "C. Mẩu Na đổi thành màu vàng và dung dịch hoá đỏ", correct: false, explain: "Chưa chính xác." },
        ],
      },
      {
        teamIndex: 2,
        question: "Cũng thí nghiệm với nước ở nhiệt độ thường, khi thả một chiếc đinh sắt (Fe) và một sợi dây đồng (Cu) vào cốc nước, hiện tượng là gì?",
        options: [
          { text: "A. Sắt tan ngay lập tức tạo khí nổ lớn", correct: false, explain: "Sắt không phản ứng với nước ở nhiệt độ thường." },
          { text: "B. Cả đinh sắt và dây đồng đều không phản ứng với nước ở nhiệt độ thường", correct: true, explain: "Chính xác theo SGK! Sắt (Fe) và đồng (Cu) không phản ứng với nước ở điều kiện thường." },
          { text: "C. Đồng tác dụng làm nước sôi sùng sục", correct: false, explain: "Đồng là kim loại hoạt động yếu, không phản ứng với nước." },
        ],
      },
      {
        teamIndex: 3,
        question: "Dựa vào khả năng phản ứng với nước ở nhiệt độ thường, hãy so sánh mức độ hoạt động hoá học giữa Na với Fe và Cu:",
        options: [
          { text: "A. Na > Fe, Cu (Natri hoạt động hoá học mạnh hơn sắt và đồng)", correct: true, explain: "Đúng hoàn toàn! Na phản ứng với nước ở điều kiện thường nên Na có mức độ hoạt động hoá học mạnh hơn Fe và Cu." },
          { text: "B. Fe > Na > Cu", correct: false, explain: "Chưa đúng, Fe không phản ứng với nước ở nhiệt độ thường." },
          { text: "C. Cu > Fe > Na", correct: false, explain: "Chưa đúng." },
        ],
      },
    ],
  },
  round2: {
    time: '12:00 - Buổi Trưa',
    location: 'Không gian làm việc & Bàn ghi nhớ của Mẹ',
    description: 'Mẹ cần ghi nhớ bảng Dãy hoạt động hoá học và phân tích thí nghiệm phản ứng với dung dịch acid HCl & muối AgNO3.',
    tasks: [
      {
        teamIndex: 0,
        question: "Quan sát thí nghiệm SGK Hình 19.1: Cho đinh sắt và dây đồng vào 2 ống nghiệm chứa dung dịch acid HCl. Hiện tượng ở ống nghiệm nào có bọt khí Hydrogen thoát ra?",
        options: [
          { text: "A. Ống nghiệm chứa đinh sắt có bọt khí, ống nghiệm chứa dây đồng không có hiện tượng", correct: true, explain: "Chính xác! Fe đẩy được Hydrogen ra khỏi dung dịch HCl (Fe > H), còn Cu đứng sau H nên không phản ứng." },
          { text: "B. Ống nghiệm chứa dây đồng có bọt khí dữ dội", correct: false, explain: "Sai rồi. Đồng đứng sau H trong dãy hoạt động nên không đẩy được H ra khỏi acid." },
          { text: "C. Cả hai ống nghiệm đều không có bọt khí nào", correct: false, explain: "Sai, Fe có phản ứng giải phóng khí H2." },
        ],
      },
      {
        teamIndex: 1,
        question: "Từ kết quả phản ứng với dung dịch acid HCl, ta sắp xếp mức độ hoạt động hoá học giữa Fe, Cu và Hydrogen (H) như thế nào?",
        options: [
          { text: "A. Cu > H > Fe", correct: false, explain: "Chưa đúng." },
          { text: "B. Fe > H > Cu (Sắt mạnh hơn H, H mạnh hơn Đồng)", correct: true, explain: "Rất xuất sắc! Fe đẩy được H nên Fe > H; Cu không đẩy được H nên H > Cu. Do đó: Fe > H > Cu." },
          { text: "C. H > Fe > Cu", correct: false, explain: "Chưa đúng, Fe đẩy được H ra khỏi acid nên Fe đứng trước H." },
        ],
      },
      {
        teamIndex: 2,
        question: "Quan sát thí nghiệm SGK Hình 19.2: Cho dây đồng uốn lò xo vào ống nghiệm chứa dung dịch AgNO3 2%. Hiện tượng quan sát được là gì?",
        options: [
          { text: "A. Không có bất kỳ hiện tượng gì xảy ra", correct: false, explain: "Có phản ứng hoá học xảy ra." },
          { text: "B. Có chất rắn màu xám bạc (Ag) bám ngoài dây đồng, dung dịch chuyển dần sang màu xanh lam nhạt", correct: true, explain: "Chính xác! Cu đẩy kim loại Ag ra khỏi dung dịch muối tạo kết tủa Ag màu xám bạc và muối Cu(NO3)2 màu xanh lam." },
          { text: "C. Dây đồng bốc cháy dữ dội trong ống nghiệm", correct: false, explain: "Sai hiện tượng." },
        ],
      },
      {
        teamIndex: 3,
        question: "Dãy hoạt động hoá học đầy đủ được nêu trong SGK theo chiều giảm dần từ trái sang phải là:",
        options: [
          { text: "A. K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au", correct: true, explain: "Hoàn toàn chính xác! Mẹo nhớ: Khi Nào Cần May Áo Giáp Sắt Nhớ Sang Phố Hỏi Cửa Hàng Á Phi." },
          { text: "B. Au, Ag, Cu, H, Pb, Fe, Zn, Al, Mg, Ca, Na, K", correct: false, explain: "Đây là chiều tăng dần, không phải giảm dần." },
          { text: "C. Fe, Cu, Ag, Au, K, Na, Ca, Mg, Al, Zn, Pb, H", correct: false, explain: "Thứ tự này bị xáo trộn." },
        ],
      },
    ],
  },
  round3: {
    time: '15:30 - Buổi Chiều',
    location: 'Tình huống sinh hoạt & Bảo quản đồ dùng gia đình',
    description: 'Buổi chiều có những tình huống phát sinh bất ngờ. Các đội hãy cùng An đưa ra quyết định thông thái và an toàn!',
    tasks: [
      {
        teamIndex: 0,
        question: "Tình huống 1: Em thấy nồi nhôm nấu ăn của gia đình bị bám cặn vôi cứng. Có người khuyên nên dùng dung dịch acid mạnh (như HCl đặc) ngâm qua đêm. An nên quyết định thế nào?",
        options: [
          { text: "A. Ngâm ngay acid mạnh qua đêm để nồi sáng bóng", correct: false, explain: "Nguy hiểm! Nhôm (Al) đứng trước H trong dãy hoạt động, sẽ bị acid ăn mòn thủng nồi và sinh khí nguy hiểm." },
          { text: "B. Không dùng acid mạnh! Dùng giấm ăn nhẹ hoặc chanh cọ rửa an toàn và xả sạch nước", correct: true, explain: "Tuyệt vời! Al tác dụng với acid mạnh làm hỏng nồi. Dùng giấm/chanh tự nhiên kết hợp rửa sạch vừa an toàn vừa bảo vệ sức khoẻ." },
          { text: "C. Đem nồi vứt đi ngay lập tức", correct: false, explain: "Chưa hợp lý, có thể làm sạch an toàn bằng nguyên liệu tự nhiên." },
        ],
      },
      {
        teamIndex: 1,
        question: "Tình huống 2: Dây chuyền bạc của Mẹ sau một thời gian bị xỉn đen do tiếp xúc hợp chất của lưu huỳnh trong mồ hôi và không khí. An muốn giúp Mẹ làm sáng trang sức một cách khoa học:",
        options: [
          { text: "A. Dùng giấy bạc (nhôm Al) lót bát, thêm muối ấm ngâm trang sức bạc để phản ứng khử diễn ra an toàn", correct: true, explain: "Chính xác & rất thông minh! Nhôm (Al) hoạt động hoá học mạnh hơn Ag, giúp hoàn nguyên bạc sáng bóng mà không hao mòn kim loại." },
          { text: "B. Dùng búa gõ thật mạnh vào dây chuyền bạc", correct: false, explain: "Sẽ làm biến dạng và gãy hỏng trang sức!" },
          { text: "C. Đốt dây chuyền trên ngọn lửa lớn", correct: false, explain: "Không an toàn và làm hỏng trang sức." },
        ],
      },
      {
        teamIndex: 2,
        question: "Tình huống 3: Bé An thấy một chiếc đinh sắt bị gỉ ở bậc thềm sau mưa. An nên làm gì để đảm bảo an toàn cho cả nhà và bảo quản dụng cụ kim loại?",
        options: [
          { text: "A. Để mặc đinh sắt ở đó, giẫm lên không sao", correct: false, explain: "Rất nguy hiểm, đinh sắt gỉ có thể gây uốn ván nếu giẫm phải." },
          { text: "B. Nhờ người lớn nhặt cất an toàn, lau khô dầu bảo dưỡng các đồ nghề sắt để tránh nước và oxy tiếp xúc làm gỉ", correct: true, explain: "Rất thấu hiểu và an toàn! Sắt bị gỉ khi tiếp xúc nước và khí oxy. Cần lau khô, tra dầu bảo quản và tránh để rơi vãi gây thương tích." },
          { text: "C. Ngâm đinh vào chậu nước đầy hơn", correct: false, explain: "Nước sẽ làm sắt gỉ nhanh hơn nữa." },
        ],
      },
      {
        teamIndex: 3,
        question: "Tình huống 4: An thấy mẹ sau giờ làm việc trông rất mệt mỏi nhưng vẫn vội vã vào bếp. Nếu là người con thấu hiểu, An nên làm gì trước tiên?",
        options: [
          { text: "A. Ngồi xem tivi và giục mẹ nấu cơm nhanh lên", correct: false, explain: "Hành động này thiếu sự sẻ chia và quan tâm mẹ." },
          { text: "B. Rót cho mẹ một cốc nước ấm, chủ động phụ giúp nhặt rau, dọn bàn ăn và hỏi thăm mẹ", correct: true, explain: "Thật ấm áp! Sự quan tâm chân thành từ những việc nhỏ bé chính là món quà quý giá nhất dành cho người thân." },
          { text: "C. Đóng kín cửa phòng chơi điện tử", correct: false, explain: "Không nên thờ ơ với sự vất vả của mẹ." },
        ],
      },
    ],
  },
};

const METALS_CLASSIFICATION = [
  { name: "K (Potassium)", group: "Mạnh" },
  { name: "Na (Natri)", group: "Mạnh" },
  { name: "Ca (Calcium)", group: "Mạnh" },
  { name: "Mg (Magnesium)", group: "Trung bình" },
  { name: "Al (Nhôm)", group: "Trung bình" },
  { name: "Zn (Kẽm)", group: "Trung bình" },
  { name: "Fe (Sắt)", group: "Trung bình" },
  { name: "Pb (Chì)", group: "Trung bình" },
  { name: "Cu (Đồng)", group: "Yếu" },
  { name: "Ag (Bạc)", group: "Yếu" },
  { name: "Au (Vàng)", group: "Yếu" },
];

export default function App() {
  // App state
  const [unlockedAudio, setUnlockedAudio] = useState(false);
  const [round, setRound] = useState(0); // 0: Home, 1..5: Rounds, 6: Finale
  const [taskIndex, setTaskIndex] = useState(0);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Shards (5 items)
  const [shards, setShards] = useState<boolean[]>([false, false, false, false, false]);

  // Teams
  const [teams, setTeams] = useState<Team[]>([
    { id: 0, name: 'HOA HỒNG', score: 0, color: 'bg-rose-500', textColor: 'text-rose-600', badge: '🌹' },
    { id: 1, name: 'ÁNH DƯƠNG', score: 0, color: 'bg-amber-500', textColor: 'text-amber-600', badge: '☀️' },
    { id: 2, name: 'NGÔI SAO', score: 0, color: 'bg-indigo-500', textColor: 'text-indigo-600', badge: '⭐' },
    { id: 3, name: 'TRÁI TIM', score: 0, color: 'bg-pink-500', textColor: 'text-pink-600', badge: '💖' },
  ]);

  // Metrics
  const [metrics, setMetrics] = useState({
    knowledge: 100,
    sharing: 0,
    solving: 0,
  });

  // Speaker and Narrator state
  const [speakerName, setSpeakerName] = useState('Cô Tiên Thời Gian');
  const [speakerAvatar, setSpeakerAvatar] = useState('🧚‍♀️');
  const [speakerText, setSpeakerText] = useState('Chào mừng các con đến với chuyến du hành kỳ diệu! Hãy chuẩn bị bắt đầu nhé.');
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [timerLimit, setTimerLimit] = useState(20);
  const [timerLeft, setTimerLeft] = useState<number | null>(null);
  const [fontScale, setFontScale] = useState<'large' | 'huge' | 'normal'>('large');

  const getQuestionFontSize = () => {
    if (fontScale === 'huge') return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-relaxed';
    if (fontScale === 'large') return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-relaxed';
    return 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-relaxed';
  };

  const getOptionFontSize = () => {
    if (fontScale === 'huge') return 'text-xl sm:text-2xl md:text-3xl font-bold';
    if (fontScale === 'large') return 'text-lg sm:text-xl md:text-2xl font-bold';
    return 'text-base sm:text-lg md:text-xl font-bold';
  };

  const getSpeakerFontSize = () => {
    if (fontScale === 'huge') return 'text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed';
    if (fontScale === 'large') return 'text-lg sm:text-xl md:text-2xl font-bold leading-relaxed';
    return 'text-base sm:text-lg md:text-xl font-bold leading-relaxed';
  };

  // Modals & Panels
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ icon: string; text: string } | null>(null);

  // Round 4 Drag/Drop Classification
  const [classifiedMetals, setClassifiedMetals] = useState<Record<string, string>>({});
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null);

  // Round 5 Card Generator
  const [cardRecipient, setCardRecipient] = useState('Mẹ kính yêu');
  const [cardTemplate, setCardTemplate] = useState<'flower' | 'sunshine' | 'starry'>('flower');
  const [cardMessage, setCardMessage] = useState('Nhân ngày Phụ nữ Việt Nam 20/10, con chúc người luôn mạnh khoẻ, ngập tràn niềm vui và hạnh phúc. Trải qua một ngày trong vai mẹ, con hiểu rằng việc nhà và sự chăm sóc cần được sẻ chia mỗi ngày. Con yêu người rất nhiều!');
  const [cardSender, setCardSender] = useState('Bé An & Các con học sinh thân yêu');

  // Audio elements & Web Audio references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentSpeechTaskRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Show Toast
  const showToast = (text: string, icon = '✨') => {
    setToastMessage({ icon, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Web Audio Context initialization
  const initAudioCtx = () => {
    if (!audioContextRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioContextRef.current = new AudioCtxClass();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  // Sound effects
  const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.2, gainLevel = 0.15) => {
    initAudioCtx();
    if (!audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const playTing = () => {
    initAudioCtx();
    if (!audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn(e);
    }
  };

  const playSuccessChord = () => {
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.6, 0.18), i * 80);
    });
  };

  const playMagic = () => {
    const melody = [587.33, 659.25, 783.99, 880.00, 1046.50];
    melody.forEach((f, i) => {
      setTimeout(() => playTone(f, 'triangle', 0.4, 0.15), i * 70);
    });
  };

  // Background music chords
  const toggleBgm = () => {
    if (!isMusicPlaying) {
      setIsMusicPlaying(true);
      showToast('Đã bật nhạc nền ấm áp', '🎵');
      initAudioCtx();
      const chords = [
        [261.63, 329.63, 392.00],
        [220.00, 261.63, 329.63],
        [174.61, 220.00, 261.63],
        [196.00, 246.94, 293.66],
      ];
      let idx = 0;
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
      bgmIntervalRef.current = setInterval(() => {
        if (!audioContextRef.current) return;
        const chord = chords[idx % chords.length];
        chord.forEach((freq) => {
          playTone(freq, 'sine', 1.6, 0.025);
        });
        idx++;
      }, 1800);
    } else {
      setIsMusicPlaying(false);
      showToast('Đã tắt nhạc nền', '🔇');
      if (bgmIntervalRef.current) {
        clearInterval(bgmIntervalRef.current);
        bgmIntervalRef.current = null;
      }
    }
  };

  // Main Text-to-Speech Engine via AI Studio Gemini Voice "Leda"
  const speakLeda = async (text: string, speaker = 'fairy', onEnded?: () => void) => {
    if (!isVoiceEnabled || !text) {
      if (onEnded) setTimeout(onEnded, 300);
      return;
    }

    currentSpeechTaskRef.current += 1;
    const thisTaskId = currentSpeechTaskRef.current;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsVoiceLoading(true);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, speaker }),
      });

      if (!res.ok) {
        throw new Error('TTS server responded with ' + res.status);
      }

      const data = await res.json();
      if (thisTaskId !== currentSpeechTaskRef.current) {
        return; // A newer speech was triggered
      }

      setIsVoiceLoading(false);

      if (data.audioData) {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = data.audioData;
        audioRef.current.onended = () => {
          if (onEnded) onEnded();
        };
        audioRef.current.onerror = () => {
          console.warn("Audio playback error, using local speech fallback");
          fallbackLocalSpeech(text, onEnded);
        };
        await audioRef.current.play().catch((err) => {
          console.warn("Autoplay blocked or playback error:", err);
          if (onEnded) onEnded();
        });
      } else {
        fallbackLocalSpeech(text, onEnded);
      }
    } catch (err) {
      console.error("Lỗi AI Studio TTS Leda:", err);
      if (thisTaskId === currentSpeechTaskRef.current) {
        setIsVoiceLoading(false);
        fallbackLocalSpeech(text, onEnded);
      }
    }
  };

  const fallbackLocalSpeech = (text: string, onEnded?: () => void) => {
    if (!('speechSynthesis' in window)) {
      if (onEnded) onEnded();
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'vi-VN';
    utt.rate = 0.95;
    utt.onend = () => { if (onEnded) onEnded(); };
    utt.onerror = () => { if (onEnded) onEnded(); };
    window.speechSynthesis.speak(utt);
  };

  const updateNarrator = (name: string, text: string, avatar = '🧚‍♀️', speakerType = 'fairy', onComplete?: () => void) => {
    setSpeakerName(name);
    setSpeakerText(text);
    setSpeakerAvatar(avatar);
    speakLeda(text, speakerType, onComplete);
  };

  // Initial welcome on unlock
  const handleInitialStart = () => {
    initAudioCtx();
    setUnlockedAudio(true);
    playMagic();
    const welcome = "Các con thân yêu! Có bao giờ các con tự hỏi, một ngày của mẹ có những công việc gì không? Hôm nay, chúng mình sẽ cùng bé An bước vào một hành trình thật đặc biệt. Mỗi lựa chọn của các con sẽ làm câu chuyện thay đổi. Các con đã sẵn sàng chưa?";
    updateNarrator("Cô Tiên Thời Gian", welcome, "🧚‍♀️", "fairy");
  };

  // Start round
  const startRound = (rNum: number) => {
    setRound(rNum);
    setTaskIndex(0);
    setHasAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    if (rNum === 1) {
      const task = ROUNDS_DATA.round1.tasks[0];
      setActiveTeamIndex(task.teamIndex);
      const team = teams[task.teamIndex];
      const qText = `Đội ${team.name} ơi, chú ý lắng nghe câu hỏi nhé: ${task.question}`;
      updateNarrator("Bé An", qText, "👧", "child", () => {
        startCountdown();
      });
    } else if (rNum === 2) {
      const task = ROUNDS_DATA.round2.tasks[0];
      setActiveTeamIndex(task.teamIndex);
      const team = teams[task.teamIndex];
      const qText = `Đội ${team.name} ơi, chú ý lắng nghe câu hỏi nhé: ${task.question}`;
      updateNarrator("Bé An", qText, "👧", "child", () => {
        startCountdown();
      });
    } else if (rNum === 3) {
      const task = ROUNDS_DATA.round3.tasks[0];
      setActiveTeamIndex(task.teamIndex);
      const team = teams[task.teamIndex];
      const qText = `Đội ${team.name} ơi, chú ý lắng nghe câu hỏi nhé: ${task.question}`;
      updateNarrator("Bé An", qText, "👧", "child", () => {
        startCountdown();
      });
    } else if (rNum === 4) {
      setClassifiedMetals({});
      setSelectedMetal(null);
      updateNarrator("Bé An", "Cả nhà mình cùng ăn tối và dọn dẹp thật vui! Các bạn hãy giúp An phân chia chính xác các nhóm kim loại nhé!", "👧", "child");
    } else if (rNum === 5) {
      updateNarrator("Cô Tiên Thời Gian", "Đây là khoảnh khắc lắng đọng nhất trong ngày. Hãy cùng viết nên những dòng tâm sự chân thành nhất để trao gửi yêu thương nhé!", "🧚‍♀️", "fairy");
    }
  };

  const startCountdown = () => {
    if (timerLimit <= 0) {
      setTimerLeft(null);
      return;
    }
    setTimerLeft(timerLimit);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    countdownTimerRef.current = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          playTone(420, 'triangle', 0.08, 0.1);
          return 0;
        }
        if (prev <= 5) {
          playTone(420, 'triangle', 0.06, 0.08);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOptionClick = (optIdx: number) => {
    if (hasAnswered) return;
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    const roundKey = `round${round}`;
    const roundData = ROUNDS_DATA[roundKey];
    if (!roundData) return;

    const currentTask = roundData.tasks[taskIndex];
    const option = currentTask.options[optIdx];
    setSelectedOption(optIdx);

    if (option.correct) {
      setHasAnswered(true);
      playTing();
      // Update team score
      const team = teams[currentTask.teamIndex];
      const updatedTeams = teams.map((t, idx) =>
        idx === currentTask.teamIndex ? { ...t, score: t.score + 10 } : t
      );
      setTeams(updatedTeams);
      setMetrics((m) => ({
        knowledge: Math.min(100, m.knowledge + 2),
        sharing: m.sharing,
        solving: m.solving + 1,
      }));

      setFeedback({
        isCorrect: true,
        text: `🎉 Chính xác! (+10 điểm cho đội ${team.name}): ${option.explain}`,
      });

      updateNarrator(
        "Cô Tiên Thời Gian",
        `Rất tuyệt vời đội ${team.name}! ${option.explain}`,
        "🧚‍♀️",
        "fairy"
      );
    } else {
      playTone(400, 'sawtooth', 0.2, 0.12);
      setFeedback({
        isCorrect: false,
        text: `Chưa chính xác: ${option.explain} (Đội có thể thảo luận và chọn lại)`,
      });
      updateNarrator(
        "Bé An",
        "Chưa đúng rồi ạ! Nhưng không sao, các bạn hãy suy nghĩ lại một chút nhé.",
        "👧",
        "child"
      );
    }
  };

  const proceedToNextTask = () => {
    const roundKey = `round${round}`;
    const roundData = ROUNDS_DATA[roundKey];
    if (!roundData) return;

    setHasAnswered(false);
    setSelectedOption(null);
    setFeedback(null);

    if (taskIndex < roundData.tasks.length - 1) {
      const nextIdx = taskIndex + 1;
      setTaskIndex(nextIdx);
      const nextTask = roundData.tasks[nextIdx];
      setActiveTeamIndex(nextTask.teamIndex);
      const team = teams[nextTask.teamIndex];
      const qText = `Đội ${team.name} ơi, chú ý lắng nghe câu hỏi nhé: ${nextTask.question}`;
      updateNarrator("Bé An", qText, "👧", "child", () => {
        startCountdown();
      });
    } else {
      // Completed all tasks in this round -> award shard
      awardShard(round);
    }
  };

  const awardShard = (roundNum: number) => {
    playSuccessChord();
    setShards((prev) => {
      const next = [...prev];
      next[roundNum - 1] = true;
      return next;
    });

    const celebrationText = `Tuyệt vời lắm! Mảnh ghép thứ ${roundNum} đã bay về vị trí. Cả lớp hãy sẵn sàng bước vào chặng đường tiếp theo nhé!`;
    updateNarrator("Cô Tiên Thời Gian", celebrationText, "🧚‍♀️", "fairy");
  };

  // Round 4 actions
  const assignMetalToGroup = (group: string) => {
    if (!selectedMetal) {
      showToast("Vui lòng chọn 1 kim loại ở trên trước!", "👆");
      return;
    }
    playTing();
    setClassifiedMetals((prev) => ({
      ...prev,
      [selectedMetal]: group,
    }));
    setSelectedMetal(null);
  };

  const checkRound4Result = () => {
    let correctCount = 0;
    METALS_CLASSIFICATION.forEach((item) => {
      if (classifiedMetals[item.name] === item.group) {
        correctCount++;
      }
    });

    if (correctCount === METALS_CLASSIFICATION.length) {
      showToast("Chính xác tuyệt đối! Cả 4 đội đều nhận thêm 10 điểm!", "🎉");
      setTeams((prev) => prev.map((t) => ({ ...t, score: t.score + 10 })));
      setMetrics((m) => ({ ...m, sharing: m.sharing + 4, knowledge: 100 }));
      awardShard(4);
    } else {
      playTone(400, 'sawtooth', 0.2, 0.1);
      showToast(`Đúng ${correctCount}/${METALS_CLASSIFICATION.length}. Gợi ý: Mạnh gồm K, Na, Ca; Yếu gồm Cu, Ag, Au!`, "💡");
    }
  };

  // Round 5: Card generator & download
  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    if (cardTemplate === 'flower') {
      gradient.addColorStop(0, '#FFF0F5');
      gradient.addColorStop(1, '#F8BBD0');
    } else if (cardTemplate === 'sunshine') {
      gradient.addColorStop(0, '#FFFDE7');
      gradient.addColorStop(1, '#FFE082');
    } else {
      gradient.addColorStop(0, '#EDE7F6');
      gradient.addColorStop(1, '#D1C4E9');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Border frame
    ctx.strokeStyle = '#D81B60';
    ctx.lineWidth = 10;
    ctx.strokeRect(25, 25, 750, 550);

    ctx.strokeStyle = '#FF80AB';
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 730, 530);

    // Header
    ctx.fillStyle = '#880E4F';
    ctx.font = 'bold 26px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌸 CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10 🌸', 400, 80);

    ctx.font = 'bold 22px Nunito, sans-serif';
    ctx.fillStyle = '#AD1457';
    ctx.fillText(`Kính gửi: ${cardRecipient}`, 400, 130);

    // Message
    ctx.fillStyle = '#37474F';
    ctx.font = 'italic 18px Nunito, sans-serif';
    const words = `"${cardMessage}"`.split(' ');
    let line = '';
    let y = 200;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 680 && n > 0) {
        ctx.fillText(line, 400, y);
        line = words[n] + ' ';
        y += 32;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    // Footer
    ctx.fillStyle = '#C2185B';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText('NẾU CON LÀ MẸ TRONG MỘT NGÀY - CON HIỂU RẰNG YÊU THƯƠNG CẦN ĐƯỢC SẺ CHIA!', 400, 480);

    ctx.fillStyle = '#455A64';
    ctx.font = 'bold 16px Nunito, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Người gửi: ${cardSender}`, 720, 530);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Thiep_20_10_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playTing();
    showToast('Đã tải thiệp chúc mừng PNG chất lượng cao thành công!', '📥');
  };

  const handleCardComplete = () => {
    awardShard(5);
    setTimeout(() => {
      setRound(6);
      playSuccessChord();
      const finaleSpeech = "Các con thân yêu! Một ngày kỳ diệu đã khép lại. Hôm nay, chúng mình không chỉ khám phá kiến thức mà còn học cách nhìn cuộc sống bằng sự quan tâm và thấu hiểu. Những việc làm nhỏ, những lời cảm ơn và sự sẻ chia mỗi ngày có thể mang đến niềm vui rất lớn. Nhân ngày Phụ nữ Việt Nam 20 tháng 10, hãy dành những lời chúc chân thành đến mẹ, bà, cô giáo và những người phụ nữ thân yêu. Và hãy nhớ: yêu thương không chỉ để nói, mà còn để thực hiện mỗi ngày!";
      updateNarrator("Cô Tiên Thời Gian", finaleSpeech, "🧚‍♀️", "fairy");
    }, 1200);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 text-slate-800 flex flex-col justify-between selection:bg-pink-300">
      {/* Autoplay policy unlock modal overlay */}
      {!unlockedAudio && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-2xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.4)] border-4 border-pink-300 animate-scaleUp relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60"></div>

            <div className="text-7xl mb-4 floating-anim relative z-10 drop-shadow-lg">🧚‍♀️</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 mb-3 relative z-10">
              Nếu Con Là Mẹ Trong Một Ngày
            </h1>
            <p className="text-purple-800 font-extrabold text-lg sm:text-xl mb-4">
              🌸 Hành Trình Thấu Hiểu & Yêu Thương 🌸
            </p>
            <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4 mb-8 text-slate-700 font-bold text-sm sm:text-base leading-relaxed">
              <p className="mb-2">
                ✨ Ứng dụng tích hợp giọng đọc <strong className="text-pink-700">AI Studio Leda</strong> chuẩn tiếng Việt giọng miền Bắc ngọt ngào, tự nhiên, truyền cảm.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Hãy bật loa thiết bị để thưởng thức trọn vẹn câu chuyện cùng Cô Tiên Thời Gian và Bé An nhé!
              </p>
            </div>

            <button
              onClick={handleInitialStart}
              className="relative z-10 px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-black shadow-[0_8px_20px_-6px_rgba(236,72,153,0.6)] hover:scale-105 transition-all text-lg sm:text-xl w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6 animate-spin" /> NHẤN ĐỂ BẮT ĐẦU HÀNH TRÌNH <Sparkles className="w-6 h-6 animate-spin" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header & Shards Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-pink-300 sticky top-0 z-40 px-3 py-2 sm:py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Title & Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-3xl sm:text-4xl floating-anim drop-shadow-sm">⏰</span>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-black text-pink-700 tracking-tight leading-tight">
                NẾU CON LÀ MẸ TRONG MỘT NGÀY
              </h1>
              <p className="text-xs sm:text-sm text-purple-700 font-bold flex flex-wrap items-center gap-1.5 mt-0.5">
                <span className="bg-pink-100 px-2 py-0.5 rounded-md border border-pink-200">🌸 20/10</span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md border border-purple-200 font-extrabold">
                  KHTN - Bài 19: Dãy hoạt động hoá học
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] font-black">
                  🎙️ Giọng Leda AI Studio
                </span>
              </p>
            </div>
          </div>

          {/* 5 Shard Indicators */}
          <div className="flex items-center bg-pink-50 px-3 sm:px-4 py-1.5 rounded-full border-2 border-pink-200 gap-1.5 sm:gap-2 shadow-inner">
            <span className="text-xs sm:text-sm font-black text-pink-800 mr-1 hidden md:inline uppercase">
              Mảnh ghép:
            </span>
            {shards.map((collected, i) => (
              <div
                key={i}
                title={`Mảnh ghép ${i + 1}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                  collected
                    ? 'bg-gradient-to-tr from-amber-400 to-pink-500 text-white shadow-lg border-2 border-white clock-glow'
                    : 'border-2 border-dashed border-pink-400 text-pink-400 bg-white/50'
                }`}
              >
                {collected ? '★' : i + 1}
              </div>
            ))}
          </div>

          {/* Audio & Utilities Control */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                setIsVoiceEnabled(!isVoiceEnabled);
                showToast(isVoiceEnabled ? 'Đã tắt giọng đọc' : 'Đã bật giọng đọc', '🔊');
                if (!isVoiceEnabled) {
                  speakLeda(speakerText);
                }
              }}
              className={`px-3 py-1.5 text-xs sm:text-sm font-black rounded-xl flex items-center gap-1.5 transition shadow-sm border ${
                isVoiceEnabled
                  ? 'bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200'
                  : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
              title="Bật/Tắt giọng đọc AI Leda"
            >
              {isVoiceLoading ? (
                <span className="animate-spin text-sm">⏳</span>
              ) : isVoiceEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-600" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="hidden md:inline">Giọng Leda</span>
            </button>

            <button
              onClick={toggleBgm}
              className={`px-3 py-1.5 text-xs sm:text-sm font-black rounded-xl flex items-center gap-1.5 transition shadow-sm border ${
                isMusicPlaying
                  ? 'bg-pink-100 border-pink-200 text-pink-800 hover:bg-pink-200'
                  : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
              title="Bật/Tắt nhạc nền"
            >
              <Music className="w-4 h-4" />
              <span className="hidden md:inline">Nhạc</span>
            </button>

            <button
              onClick={() => {
                const nextScale = fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'huge' : 'normal';
                setFontScale(nextScale);
                showToast(`Đã đổi cỡ chữ: ${nextScale === 'huge' ? 'Cực Lớn (A++)' : nextScale === 'large' ? 'Rất Lớn (A+)' : 'Chuẩn (A)'}`, '🔤');
              }}
              className="px-3 py-1.5 text-xs sm:text-sm font-black bg-indigo-100 border border-indigo-200 text-indigo-900 hover:bg-indigo-200 rounded-xl transition shadow-sm flex items-center gap-1.5"
              title="Phóng to / thu nhỏ cỡ chữ trình chiếu"
            >
              <span className="font-extrabold text-sm sm:text-base">A{fontScale === 'huge' ? '++' : fontScale === 'large' ? '+' : ''}</span>
              <span className="hidden sm:inline">{fontScale === 'huge' ? 'Cực Lớn' : fontScale === 'large' ? 'Chữ Lớn' : 'Chữ Chuẩn'}</span>
            </button>

            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                  showToast('Đã sao chép link ứng dụng thành công!', '📋');
                }).catch(() => {
                  showToast('Hãy copy link từ thanh địa chỉ trình duyệt!', '📋');
                });
              }}
              className="px-3 py-1.5 text-xs sm:text-sm font-black bg-pink-100 border border-pink-200 text-pink-800 hover:bg-pink-200 rounded-xl transition shadow-sm flex items-center gap-1.5"
              title="Sao chép link ứng dụng"
            >
              <Share2 className="w-4 h-4 text-pink-600" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-sm bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 rounded-xl transition shadow-sm font-black"
              title="Toàn màn hình"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowTeacherModal(true)}
              className="px-3 py-1.5 text-xs sm:text-sm font-black bg-amber-100 border border-amber-200 text-amber-900 hover:bg-amber-200 rounded-xl transition shadow-sm flex items-center gap-1"
              title="Bảng điều khiển giáo viên"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Giáo viên</span>
            </button>
          </div>
        </div>
      </header>

      {/* 4 Teams Scoreboard & Metrics */}
      <section className="bg-white/90 border-b-2 border-pink-200 px-3 py-2 sm:py-3 shadow-md z-30 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* 4 Teams Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full lg:w-auto flex-1 max-w-4xl">
            {teams.map((team, idx) => {
              const isActive = round >= 1 && round <= 3 && activeTeamIndex === idx;
              return (
                <div
                  key={team.id}
                  className={`p-2 sm:p-3 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-pink-100 border-pink-500 ring-4 ring-pink-300 scale-[1.03] shadow-lg'
                      : 'bg-white border-slate-200 shadow-sm hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-2xl sm:text-3xl drop-shadow-md">{team.badge}</span>
                    <div className="truncate flex flex-col justify-center">
                      <span className={`text-sm sm:text-base md:text-lg font-black uppercase ${team.textColor} block truncate tracking-wide`}>
                        {team.name}
                      </span>
                      {isActive && (
                        <span className="text-xs sm:text-sm font-black text-pink-600 bg-white/80 px-1.5 py-0.5 rounded-md inline-block animate-pulse w-fit border border-pink-200 mt-0.5">
                          ⭐ Lượt trả lời
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 ml-2 font-mono drop-shadow-sm">
                    {team.score}đ
                  </span>
                </div>
              );
            })}
          </div>

          {/* Educational Metrics */}
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-slate-700 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 rounded-2xl border-2 border-purple-200 shadow-sm">
            <span className="font-black text-purple-900 uppercase tracking-wide text-xs sm:text-sm mr-1">Thành tích:</span>
            <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-pink-100 shadow-sm">
              💡 Kiến thức: <strong className="text-pink-600 font-black text-base sm:text-lg">{metrics.knowledge}%</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-purple-100 shadow-sm">
              🤝 Sẻ chia: <strong className="text-purple-600 font-black text-base sm:text-lg">+{metrics.sharing}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-amber-100 shadow-sm">
              🎯 Giải quyết: <strong className="text-amber-600 font-black text-base sm:text-lg">+{metrics.solving}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-3xl shadow-xl border border-pink-200 overflow-hidden flex flex-col relative transition-all min-h-[540px]">
          {/* Stage dynamic content */}
          <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 justify-between">
            {/* ROUND 0: HOME SCREEN */}
            {round === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-6 px-4 animate-scaleUp">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-800 text-sm sm:text-base font-black mb-3 border-2 border-pink-300 shadow-md">
                  <span className="text-xl">💐</span> Hoạt động giáo dục ý nghĩa chào mừng 20/10
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 tracking-tight leading-tight drop-shadow-lg mb-2 py-2">
                  NẾU CON LÀ MẸ TRONG MỘT NGÀY
                </h2>
                <p className="font-handwriting text-2xl sm:text-4xl text-purple-700 mt-1 font-bold">
                  “Một ngày trải nghiệm – Muôn điều yêu thương”
                </p>
                <p className="text-base sm:text-xl md:text-2xl text-slate-700 max-w-3xl mt-4 leading-relaxed font-bold bg-white/70 p-4 sm:p-5 rounded-2xl border border-pink-100 shadow-sm">
                  Hành trình nhập vai kỳ diệu cùng bé An: Khám phá kiến thức khoa học từ{' '}
                  <strong className="text-pink-700 font-black">Bài 19: Dãy hoạt động hoá học</strong>, thấu hiểu những lo toan của Mẹ và thu thập 5 mảnh ghép đồng hồ yêu thương cùng giọng đọc Leda AI Studio truyền cảm!
                </p>

                {/* Team rename configuration */}
                <div className="w-full bg-gradient-to-b from-pink-50 to-purple-50 p-4 sm:p-5 rounded-3xl border-2 border-pink-200 mt-6 shadow-inner">
                  <h4 className="text-sm sm:text-base font-black uppercase text-pink-800 mb-3 tracking-widest flex items-center justify-center gap-2">
                    <span>⚔️</span> TÊN 4 ĐỘI TRANH TÀI <span>⚔️</span>
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                    {teams.map((t, idx) => (
                      <div key={t.id} className="flex items-center bg-white rounded-2xl p-3 border-2 border-pink-200 shadow-sm">
                        <span className="text-2xl sm:text-3xl mr-2">{t.badge}</span>
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => {
                            const val = e.target.value.toUpperCase();
                            setTeams((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, name: val } : item))
                            );
                          }}
                          className="w-full text-base sm:text-lg font-black text-slate-800 uppercase bg-transparent outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => {
                      playMagic();
                      startRound(1);
                    }}
                    className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-black text-lg sm:text-2xl rounded-full shadow-[0_10px_25px_-5px_rgba(236,72,153,0.6)] hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <Play className="w-6 h-6 fill-white" /> BẮT ĐẦU HÀNH TRÌNH
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url).then(() => {
                        showToast('Đã sao chép link ứng dụng thành công!', '📋');
                      }).catch(() => {
                        showToast('Hãy copy link từ thanh địa chỉ trình duyệt!', '📋');
                      });
                    }}
                    className="px-6 py-4 sm:px-8 sm:py-5 bg-pink-50 text-pink-800 border-2 border-pink-300 font-black text-base sm:text-xl rounded-full hover:bg-pink-100 transition-all shadow-md flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5 text-pink-600" /> Sao Chép Link
                  </button>
                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="px-6 py-4 sm:px-8 sm:py-5 bg-white text-purple-800 border-2 border-purple-300 font-black text-base sm:text-xl rounded-full hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" /> Hướng Dẫn
                  </button>
                </div>
              </div>
            )}

            {/* ROUNDS 1, 2, 3: STANDARD QUESTION STAGES */}
            {round >= 1 && round <= 3 && !shards[round - 1] && (
              <div className="flex flex-col h-full justify-between animate-scaleUp">
                {/* Header bar */}
                {(() => {
                  const roundKey = `round${round}`;
                  const currentRoundData = ROUNDS_DATA[roundKey];
                  const currentTask = currentRoundData.tasks[taskIndex];
                  const team = teams[currentTask.teamIndex];
                  return (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-pink-200">
                        <div>
                          <div className="text-sm sm:text-base font-black text-pink-600 tracking-widest uppercase">
                            {currentRoundData.time}
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 mt-0.5">
                            {currentRoundData.location}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className={`text-sm sm:text-base px-3.5 sm:px-4 py-2 rounded-xl font-black ${team.color} text-white shadow-md uppercase`}>
                            Lượt: {team.badge} {team.name}
                          </span>
                          <div className="flex items-center bg-pink-100 text-pink-900 px-3.5 py-2 rounded-xl text-sm sm:text-base font-black border border-pink-300 shadow-sm">
                            Nhiệm vụ: {taskIndex + 1}/{currentRoundData.tasks.length}
                          </div>
                          <div className="bg-rose-600 text-white font-mono text-sm sm:text-base px-3.5 py-2 rounded-xl font-black min-w-[54px] text-center shadow-md">
                            ⏳ {timerLeft !== null ? `${timerLeft}s` : '∞'}
                          </div>
                        </div>
                      </div>

                      {/* Scenario description */}
                      <div className="my-3 bg-pink-50 p-4 sm:p-5 rounded-2xl border-2 border-pink-200 text-base sm:text-xl md:text-2xl text-slate-800 font-bold flex items-center gap-3.5 shadow-sm">
                        <span className="text-3xl sm:text-4xl">👩‍👧</span>
                        <span className="leading-relaxed">{currentRoundData.description}</span>
                      </div>

                      {/* Question card */}
                      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 p-5 sm:p-7 md:p-8 rounded-3xl border-4 border-pink-300 shadow-lg my-2 relative overflow-hidden">
                        <p className="text-sm sm:text-base font-black text-purple-800 uppercase mb-2 tracking-widest">
                          Câu hỏi khoa học (Bài 19):
                        </p>
                        <p className={`${getQuestionFontSize()} text-indigo-950`}>
                          {currentTask.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-3 sm:gap-4 my-3">
                        {currentTask.options.map((opt, idx) => {
                          const isChosen = selectedOption === idx;
                          let btnStyle = 'border-slate-200 bg-white hover:border-pink-400 hover:bg-pink-50 text-slate-700';
                          if (isChosen && opt.correct) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-300';
                          } else if (isChosen && !opt.correct) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-300';
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(idx)}
                              className={`p-4 sm:p-5 md:p-6 text-left rounded-2xl border-4 transition-all duration-200 flex items-start gap-3 sm:gap-4 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${getOptionFontSize()} ${btnStyle}`}
                            >
                              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-800 shrink-0 border-2 border-slate-300 text-base sm:text-xl">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="flex-1 mt-1 leading-relaxed">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback bar */}
                      <div className="min-h-[56px] flex items-center justify-between text-base sm:text-lg md:text-xl font-bold text-slate-700 bg-slate-100 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-inner mt-2">
                        <div className="flex items-center gap-2.5">
                          {feedback?.isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                          ) : feedback ? (
                            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                          ) : (
                            <HelpCircle className="w-6 h-6 text-purple-600 shrink-0" />
                          )}
                          <span className="leading-relaxed">
                            {feedback
                              ? feedback.text
                              : '💡 Hãy cùng thảo luận và chọn phương án chính xác nhất nhé!'}
                          </span>
                        </div>
                        {hasAnswered && (
                          <button
                            onClick={proceedToNextTask}
                            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-sm sm:text-base font-black transition-all flex items-center gap-2 shadow-md uppercase tracking-wide shrink-0 ml-3"
                          >
                            Tiếp tục <ArrowRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* SHARD AWARD CELEBRATION SCREEN */}
            {round >= 1 && round <= 3 && shards[round - 1] && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10 animate-scaleUp">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-rose-500 flex items-center justify-center text-5xl sm:text-6xl shadow-[0_0_50px_rgba(244,114,182,0.6)] clock-glow mb-6 border-4 border-white/60">
                  ⏰
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-pink-700 tracking-tight leading-tight">
                  CHÚC MỪNG CÁC ĐỘI ĐÃ THU HOẠCH ĐƯỢC MẢNH GHÉP SỐ {round}!
                </h3>
                <p className="text-base sm:text-lg text-slate-700 max-w-2xl mt-3 font-bold leading-relaxed bg-white/60 p-4 rounded-2xl border border-pink-200">
                  Đồng hồ phép thuật phát sáng rực rỡ! Bé An đã thấu hiểu thêm một chặng đường vất vả và tràn ngập tình yêu thương của Mẹ.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => startRound(round + 1)}
                    className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-black text-base sm:text-xl shadow-[0_10px_25px_-5px_rgba(219,39,119,0.5)] hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    Tiếp tục đến Vòng {round + 1} <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {/* ROUND 4: CLASSIFICATION DRAG/DROP */}
            {round === 4 && !shards[3] && (
              <div className="flex flex-col h-full justify-between animate-scaleUp">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b-2 border-pink-200 gap-3">
                  <div>
                    <span className="text-sm sm:text-base font-black text-purple-700 uppercase tracking-widest">
                      VÒNG 4: 18:30 - BUỔI TỐI ẤM ÁP
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 mt-0.5">
                      Thử Thách: Yêu Thương Là Sẻ Chia & Phân Loại Kim Loại
                    </h3>
                  </div>
                  <div className="text-sm sm:text-base bg-purple-100 border border-purple-300 text-purple-900 px-4 py-2 rounded-xl font-black uppercase shadow-sm">
                    🤝 Chung sức 4 đội
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 sm:p-5 rounded-r-xl my-3 shadow-sm text-base sm:text-lg md:text-xl text-slate-800 font-bold leading-relaxed">
                  Các con hãy phân loại các kim loại trong <strong className="text-pink-700 font-black">Bài 19</strong> vào đúng 3 nhóm: <strong className="text-emerald-700 font-black">Mạnh</strong>, <strong className="text-amber-700 font-black">Trung bình</strong>, hoặc <strong className="text-rose-700 font-black">Yếu</strong>
                  <br />
                  <span className="text-slate-600 italic text-sm sm:text-base">
                    (Chạm/Click chọn 1 kim loại ở ô phía trên, sau đó bấm nút ở nhóm tương ứng bên dưới)
                  </span>
                </div>

                {/* Pool of metals */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl border-4 border-pink-200 min-h-[90px] flex flex-wrap gap-2.5 items-center justify-center shadow-inner">
                  {METALS_CLASSIFICATION.map((m) => {
                    const isSelected = selectedMetal === m.name;
                    const isAssigned = !!classifiedMetals[m.name];
                    return (
                      <button
                        key={m.name}
                        onClick={() => {
                          playTing();
                          setSelectedMetal(m.name);
                        }}
                        className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-sm sm:text-base md:text-lg font-black border-2 transition-all ${
                          isSelected
                            ? 'bg-pink-100 border-pink-500 ring-4 ring-pink-300 text-pink-900 scale-105 shadow-md'
                            : isAssigned
                            ? 'bg-slate-100 border-slate-300 text-slate-400 line-through opacity-50'
                            : 'bg-slate-50 border-slate-300 text-slate-800 hover:border-pink-400 hover:scale-105 shadow-sm'
                        }`}
                      >
                        {m.name}
                      </button>
                    );
                  })}
                </div>

                {/* 3 Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-3">
                  {/* Mạnh */}
                  <div className="bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[170px]">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-emerald-900 uppercase text-center border-b-2 border-emerald-200 pb-1.5 mb-2.5">
                        🟢 Kim loại MẠNH <span className="text-emerald-700 font-bold block text-xs sm:text-sm">(K, Na, Ca...)</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(classifiedMetals)
                          .filter(([_, g]) => g === 'Mạnh')
                          .map(([name]) => (
                            <span key={name} className="px-3 py-1.5 bg-white border border-emerald-300 rounded-xl text-sm sm:text-base font-black text-slate-800 shadow-sm">
                              {name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <button
                      onClick={() => assignMetalToGroup('Mạnh')}
                      className="w-full mt-3.5 py-2.5 bg-emerald-200 hover:bg-emerald-300 border border-emerald-400 text-emerald-950 rounded-xl text-sm sm:text-base font-black uppercase shadow-sm"
                    >
                      👇 Thêm vào đây
                    </button>
                  </div>

                  {/* Trung bình */}
                  <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[170px]">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-amber-900 uppercase text-center border-b-2 border-amber-200 pb-1.5 mb-2.5">
                        🟡 TRUNG BÌNH <span className="text-amber-700 font-bold block text-xs sm:text-sm">(Mg ➔ Pb)</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(classifiedMetals)
                          .filter(([_, g]) => g === 'Trung bình')
                          .map(([name]) => (
                            <span key={name} className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-sm sm:text-base font-black text-slate-800 shadow-sm">
                              {name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <button
                      onClick={() => assignMetalToGroup('Trung bình')}
                      className="w-full mt-3.5 py-2.5 bg-amber-200 hover:bg-amber-300 border border-amber-400 text-amber-950 rounded-xl text-sm sm:text-base font-black uppercase shadow-sm"
                    >
                      👇 Thêm vào đây
                    </button>
                  </div>

                  {/* Yếu */}
                  <div className="bg-rose-50 border-4 border-rose-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[170px]">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-rose-900 uppercase text-center border-b-2 border-rose-200 pb-1.5 mb-2.5">
                        🔴 Kim loại YẾU <span className="text-rose-700 font-bold block text-xs sm:text-sm">(Cu, Ag, Au)</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(classifiedMetals)
                          .filter(([_, g]) => g === 'Yếu')
                          .map(([name]) => (
                            <span key={name} className="px-3 py-1.5 bg-white border border-rose-300 rounded-xl text-sm sm:text-base font-black text-slate-800 shadow-sm">
                              {name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <button
                      onClick={() => assignMetalToGroup('Yếu')}
                      className="w-full mt-3.5 py-2.5 bg-rose-200 hover:bg-rose-300 border border-rose-400 text-rose-950 rounded-xl text-sm sm:text-base font-black uppercase shadow-sm"
                    >
                      👇 Thêm vào đây
                    </button>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-slate-200">
                  <span className="text-sm sm:text-base text-slate-700 font-black bg-slate-100 px-3.5 py-2 rounded-xl">
                    Đã xếp: {Object.keys(classifiedMetals).length}/{METALS_CLASSIFICATION.length} kim loại
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setClassifiedMetals({});
                        setSelectedMetal(null);
                      }}
                      className="px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-800 text-sm sm:text-base font-black rounded-xl hover:bg-slate-50"
                    >
                      🔄 Xếp lại
                    </button>
                    <button
                      onClick={checkRound4Result}
                      className="px-7 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-black rounded-xl shadow-md hover:scale-105 transition-transform"
                    >
                      ✓ KIỂM TRA ĐÁP ÁN
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ROUND 4 SHARD AWARD */}
            {round === 4 && shards[3] && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10 animate-scaleUp">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-rose-500 flex items-center justify-center text-5xl sm:text-6xl shadow-[0_0_50px_rgba(244,114,182,0.6)] clock-glow mb-6 border-4 border-white/60">
                  ⏰
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-pink-700 tracking-tight leading-tight">
                  XUẤT SẮC! CẢ LỚP ĐÃ MỞ KHÓA MẢNH GHÉP SỐ 4!
                </h3>
                <p className="text-base sm:text-lg text-slate-700 max-w-2xl mt-3 font-bold leading-relaxed bg-white/60 p-4 rounded-2xl border border-pink-200">
                  Cả 4 đội đã cùng chung sức giải mã thành công toàn bộ dãy hoạt động hoá học! Giờ là lúc viết nên những tâm tình ngọt ngào nhất.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => startRound(5)}
                    className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-black text-base sm:text-xl shadow-[0_10px_25px_-5px_rgba(219,39,119,0.5)] hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    Tiến vào Vòng 5: Thiệp Tri Ân 20/10 <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {/* ROUND 5: CARD DESIGNER */}
            {round === 5 && (
              <div className="flex flex-col h-full justify-between animate-scaleUp">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b-2 border-pink-200 gap-2">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-rose-600 uppercase tracking-widest">
                      VÒNG 5: 20:30 - ĐÊM THẤU HIỂU & YÊU THƯƠNG
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-800 mt-0.5">
                      Nhật Ký Bé An & Tấm Thiệp Tri Ân 20/10
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm bg-rose-100 border border-rose-300 text-rose-900 px-3 py-1.5 rounded-xl font-black flex items-center gap-1">
                    🎨 Thiết kế thiệp số
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-3">
                  {/* Input Side */}
                  <div className="bg-white p-4 sm:p-6 rounded-3xl border-4 border-pink-200 text-sm sm:text-base space-y-4 shadow-sm">
                    <div>
                      <label className="font-black text-slate-800 block mb-1.5 text-sm sm:text-base">
                        1. Con muốn gửi thiệp tri ân đến ai?
                      </label>
                      <select
                        value={cardRecipient}
                        onChange={(e) => setCardRecipient(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border-2 border-pink-300 font-bold text-slate-800 outline-none text-base sm:text-lg"
                      >
                        <option value="Mẹ kính yêu">💐 Mẹ kính yêu</option>
                        <option value="Bà kính yêu">👵 Bà kính yêu</option>
                        <option value="Cô giáo kính mến">👩‍🏫 Cô giáo kính mến</option>
                        <option value="Người chăm sóc thân yêu">💖 Người chăm sóc thân thương</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-black text-slate-800 block mb-1.5 text-sm sm:text-base">
                        2. Chọn mẫu thiệp phong cách:
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCardTemplate('flower')}
                          className={`flex-1 py-2.5 rounded-xl font-black text-sm border uppercase ${
                            cardTemplate === 'flower'
                              ? 'bg-pink-500 text-white border-pink-600'
                              : 'bg-pink-50 text-pink-900 border-pink-200'
                          }`}
                        >
                          🌸 Hoa Hồng
                        </button>
                        <button
                          onClick={() => setCardTemplate('sunshine')}
                          className={`flex-1 py-2.5 rounded-xl font-black text-sm border uppercase ${
                            cardTemplate === 'sunshine'
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'bg-amber-50 text-amber-900 border-amber-200'
                          }`}
                        >
                          ☀️ Nắng Ấm
                        </button>
                        <button
                          onClick={() => setCardTemplate('starry')}
                          className={`flex-1 py-2.5 rounded-xl font-black text-sm border uppercase ${
                            cardTemplate === 'starry'
                              ? 'bg-purple-500 text-white border-purple-600'
                              : 'bg-purple-50 text-purple-900 border-purple-200'
                          }`}
                        >
                          ✨ Ánh Sao
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="font-black text-slate-800 block mb-1.5 text-sm sm:text-base">
                        3. Lời chúc từ trái tim:
                      </label>
                      <textarea
                        rows={3}
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border-2 border-pink-300 font-bold text-slate-700 outline-none leading-relaxed text-sm sm:text-base"
                      />
                      <div className="flex gap-2 mt-1.5">
                        <button
                          onClick={() => {
                            setCardMessage(
                              "Hôm nay con đã học được dãy hoạt động hoá học và hiểu rằng mẹ đã luôn âm thầm vun vén gia đình. Con hứa sẽ chủ động sẻ chia việc nhà để nụ cười của mẹ luôn rạng rỡ!"
                            );
                          }}
                          className="text-xs sm:text-sm bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-lg text-pink-700 font-black"
                        >
                          💡 Gợi ý 1 (Ý nghĩa sẻ chia)
                        </button>
                        <button
                          onClick={() => {
                            setCardMessage(
                              "Nhân ngày 20/10, chúng con kính chúc cô giáo kính yêu luôn tràn đầy nhiệt huyết, hạnh phúc và sức khoẻ để dìu dắt chúng con nên người!"
                            );
                          }}
                          className="text-xs sm:text-sm bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg text-purple-700 font-black"
                        >
                          💡 Gợi ý 2 (Tri ân Cô giáo)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="font-black text-slate-800 block mb-1.5 text-sm sm:text-base">4. Tên người gửi:</label>
                      <input
                        type="text"
                        value={cardSender}
                        onChange={(e) => setCardSender(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border-2 border-pink-300 font-black text-slate-800 outline-none text-base"
                      />
                    </div>
                  </div>

                  {/* Preview Side */}
                  <div className="flex flex-col items-center justify-center bg-slate-100 p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-inner">
                    <div
                      className={`w-full max-w-md aspect-[4/3] rounded-2xl p-6 shadow-xl border-4 flex flex-col justify-between text-center transition-all ${
                        cardTemplate === 'flower'
                          ? 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 text-pink-950 border-pink-400'
                          : cardTemplate === 'sunshine'
                          ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 text-amber-950 border-amber-400'
                          : 'bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 text-purple-950 border-purple-400'
                      }`}
                    >
                      <div className="border-b-2 border-black/10 pb-2.5">
                        <span className="text-xs uppercase font-black tracking-widest opacity-80">
                          CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
                        </span>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-black mt-1">Kính gửi: {cardRecipient}</h4>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg italic font-bold leading-relaxed my-2.5 px-2 max-h-[110px] overflow-y-auto custom-scrollbar">
                        "{cardMessage}"
                      </p>
                      <div className="border-t-2 border-black/10 pt-2 flex justify-between items-center text-xs sm:text-sm font-black">
                        <span>❤️ Yêu thương là sẻ chia</span>
                        <span className="text-right">Người gửi: {cardSender}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-5 w-full max-w-md">
                      <button
                        onClick={handleDownloadCard}
                        className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-sm sm:text-base rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 border border-pink-400"
                      >
                        <Download className="w-5 h-5" /> TẢI ẢNH PNG
                      </button>
                      <button
                        onClick={handleCardComplete}
                        className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm sm:text-base rounded-xl shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 border border-purple-400"
                      >
                        <Award className="w-5 h-5" /> HOÀN THÀNH
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ROUND 6: FINALE SCREEN */}
            {round === 6 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8 max-w-5xl mx-auto animate-scaleUp">
                <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-pink-400 opacity-20 animate-ping"></div>
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-7xl shadow-[0_0_40px_rgba(236,72,153,0.8)] clock-glow border-4 border-white">
                    💖
                  </div>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 leading-tight mb-2">
                  NẾU CON LÀ MẸ TRONG MỘT NGÀY
                </h2>
                <p className="text-2xl sm:text-4xl font-handwriting text-pink-700 mt-1 font-bold">
                  “Con hiểu rằng yêu thương cần được sẻ chia!”
                </p>
                <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm sm:text-base px-6 py-2 rounded-full shadow-lg mt-3">
                  💐 CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10 💐
                </div>

                <p className="text-base sm:text-xl md:text-2xl text-slate-800 max-w-3xl mt-5 font-bold leading-relaxed bg-white/85 p-5 sm:p-6 rounded-3xl border-2 border-pink-200 shadow-md">
                  Hành trình một ngày đã khép lại. Bé An trở lại là một cô bé hồn nhiên nhưng trong lòng ngập tràn sự thấu hiểu. Bốn đội chơi đã xuất sắc chinh phục các kiến thức về{' '}
                  <strong className="text-pink-700 uppercase">Dãy hoạt động hoá học</strong> và học được bài học sẻ chia việc nhà để yêu thương không chỉ là lời nói mà là hành động mỗi ngày!
                </p>

                {/* 4 Teams honorable cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full mt-6">
                  {teams.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 sm:p-5 bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 text-center shadow-md"
                    >
                      <span className="text-3xl sm:text-4xl">{t.badge}</span>
                      <h5 className="text-sm sm:text-base md:text-lg font-black uppercase text-pink-800 mt-1">
                        {t.name}
                      </h5>
                      <p className="text-2xl sm:text-3xl font-black text-slate-800 font-mono my-1">
                        {t.score} điểm
                      </p>
                      <span className="text-xs sm:text-sm font-black text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-lg inline-block">
                        Đội Sẻ Chia Ưu Tú
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
                  <button
                    onClick={() => speakLeda(speakerText)}
                    className="px-6 py-3 bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-purple-900 rounded-xl text-sm sm:text-base font-black flex items-center gap-2"
                  >
                    <Volume2 className="w-5 h-5" /> Nghe Lại Lời Kết (Giọng Leda)
                  </button>
                  <button
                    onClick={() => startRound(5)}
                    className="px-6 py-3 bg-pink-100 hover:bg-pink-200 border-2 border-pink-300 text-pink-900 rounded-xl text-sm sm:text-base font-black flex items-center gap-2"
                  >
                    💌 Tải Thêm Thiệp 20/10
                  </button>
                  <button
                    onClick={() => setRound(0)}
                    className="px-7 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-sm sm:text-base font-black shadow-md hover:scale-105 transition-transform"
                  >
                    🏠 Về Màn Hình Chính
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Narrator Banner at bottom of stage */}
          <div className="relative z-20 bg-gradient-to-r from-pink-600 via-purple-700 to-pink-600 text-white p-4 sm:p-5 md:p-6 rounded-b-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.15)] border-t-4 border-pink-400 flex items-center gap-4 sm:gap-6">
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/90 shadow-lg">
              <span className="text-4xl sm:text-5xl">{speakerAvatar}</span>
              {isVoiceLoading && (
                <div className="absolute inset-0 rounded-full bg-pink-900/60 flex items-center justify-center">
                  <span className="animate-spin text-lg">⏳</span>
                </div>
              )}
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm sm:text-base md:text-lg font-black tracking-widest text-amber-300 uppercase">
                  {speakerName}
                </span>
                <button
                  onClick={() => {
                    playTing();
                    speakLeda(speakerText, speakerAvatar === '👧' ? 'child' : 'fairy');
                  }}
                  className="text-xs sm:text-sm font-bold text-white bg-white/25 hover:bg-white/35 border border-white/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition shadow-sm"
                  title="Đọc lại bằng giọng AI Leda"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Đọc lại
                </button>
              </div>
              <p className={`${getSpeakerFontSize()} font-bold leading-relaxed text-white drop-shadow-sm`}>
                {speakerText}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Teacher Control Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-scaleUp">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-4 border-pink-300">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-purple-800 flex items-center gap-2">
                <span>👩‍🏫</span> Bảng Điều Khiển Giáo Viên
              </h3>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Cộng/Trừ điểm trực tiếp cho từng đội:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {teams.map((t, idx) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <span className={`font-black text-xs ${t.textColor}`}>
                        {t.badge} {t.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setTeams((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, score: Math.max(0, item.score - 5) } : item
                              )
                            );
                            playTing();
                          }}
                          className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded font-bold"
                        >
                          -5
                        </button>
                        <span className="font-bold font-mono text-xs w-7 text-center">
                          {t.score}
                        </span>
                        <button
                          onClick={() => {
                            setTeams((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, score: item.score + 10 } : item
                              )
                            );
                            playTing();
                          }}
                          className="w-6 h-6 bg-pink-500 hover:bg-pink-600 text-white rounded font-bold"
                        >
                          +10
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Thời gian đếm ngược mỗi nhiệm vụ:
                </label>
                <select
                  value={timerLimit}
                  onChange={(e) => setTimerLimit(parseInt(e.target.value, 10))}
                  className="w-full border border-slate-300 rounded-xl p-2 font-medium bg-slate-50 outline-none"
                >
                  <option value={0}>Không giới hạn (Giáo viên tự điều tiết)</option>
                  <option value={15}>15 giây</option>
                  <option value={20}>20 giây</option>
                  <option value={30}>30 giây</option>
                  <option value={45}>45 giây</option>
                </select>
              </div>

              <div className="pt-3 border-t flex flex-wrap justify-between items-center gap-2">
                <button
                  onClick={() => {
                    setShowTeacherModal(false);
                    proceedToNextTask();
                  }}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs"
                >
                  ⏩ Chuyển nhanh nhiệm vụ tiếp theo
                </button>
                <button
                  onClick={() => {
                    setShowTeacherModal(false);
                    setShards([false, false, false, false, false]);
                    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
                    setRound(0);
                    showToast('Đã đặt lại toàn bộ trò chơi', '🔄');
                  }}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs"
                >
                  🔄 Đặt lại toàn bộ trò chơi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-scaleUp">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl border-4 border-pink-300">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-pink-700 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Hướng Dẫn Hành Trình 20/10
              </h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              <p>
                🌸 <strong>Mục tiêu:</strong> 4 đội (Hoa Hồng, Ánh Dương, Ngôi Sao, Trái Tim) lần lượt trả lời các câu hỏi và giải quyết tình huống qua 5 vòng mốc thời gian trong ngày để thu thập đủ 5 mảnh ghép đồng hồ yêu thương.
              </p>
              <p>
                🧪 <strong>Kiến thức KHTN:</strong> Ôn tập Bài 19 - Dãy hoạt động hoá học kim loại (K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au) và các thí nghiệm với nước, dung dịch acid, dung dịch muối.
              </p>
              <p>
                🎙️ <strong>Âm thanh:</strong> Tích hợp công nghệ giọng đọc chuẩn tiếng Việt của <strong>Leda AI Studio</strong> với phong thái tự nhiên, ngọt ngào, truyền cảm.
              </p>
              <p>
                💌 <strong>Vòng 5:</strong> Các đội tự tay tạo và tải về thiệp tri ân 20/10 gửi Mẹ, Bà hoặc Cô giáo!
              </p>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-black text-xs sm:text-sm"
              >
                Đã hiểu!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900/90 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-pink-400 text-xs sm:text-sm font-bold flex items-center gap-2 animate-scaleUp">
          <span>{toastMessage.icon}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Hidden Canvas for Card Generation */}
      <canvas ref={canvasRef} width={800} height={600} className="hidden" />
    </div>
  );
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'speech' | 'platform' | 'agents' | 'fullstack';
  metrics: { label: string; value: string }[];
  description: string;
  architecture: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface S2STStage {
  step: string;
  title: string;
  model: string;
  description: string;
  metric: string;
  status: string;
}

export const PERSONAL_INFO = {
  name: "Vishal Kaushal",
  role: "Applied AI & Speech Systems Engineer",
  tagline: "Architecting low-latency speech pipelines, enterprise GenAI engines, and resilient cloud systems.",
  location: "Pune, India (UTC+5:30)",
  availability: "Available for high-impact AI Engineering roles",
  email: "kaushalvishal83@gmail.com",
  phone: "+91-8208419263",
  avatarUrl: "https://github.com/Vish178.png",
  github: "https://github.com/Vish178",
  linkedin: "https://www.linkedin.com/in/vishal-kaushal-ml/",
  resumePdf: `${import.meta.env.BASE_URL}Vishal_Kaushal_Resume.pdf`,
};

export const CORE_METRICS: MetricItem[] = [
  {
    id: "ram-cut",
    value: "74% Peak RAM Cut",
    label: "Memory Footprint",
    subtext: "1.9 GB → 0.49 GB on 21-min audio processing chunks, eliminating OOM crashes",
    iconName: "Cpu"
  },
  {
    id: "flac-storage",
    value: "95% Disk Savings",
    label: "Audio Storage Footprint",
    subtext: "Master asset standardization to lossless FLAC with on-demand transcode delivery",
    iconName: "HardDrive"
  },
  {
    id: "webrtc-latency",
    value: "< 500ms End-to-End",
    label: "Full-Duplex Voice Latency",
    subtext: "Sub-500ms WebRTC pipeline with instant Silero VAD mid-sentence barge-in",
    iconName: "Zap"
  },
  {
    id: "agent-loops",
    value: "12 Concurrent Loops",
    label: "Autonomous Background Workers",
    subtext: "High-throughput asynchronous lead enrichment, warmth scoring, and multi-channel outreach",
    iconName: "Activity"
  },
  {
    id: "languages",
    value: "100+ Languages",
    label: "Speech Localization",
    subtext: "Multi-speaker voice synthesis, per-line subtitle alignment, and timing fit",
    iconName: "Languages"
  }
];

export const S2ST_PIPELINE: S2STStage[] = [
  {
    step: "01",
    title: "Vocal Extraction & Word Alignment",
    model: "WhisperX + VAD",
    description: "Segments vocal audio from background noise, producing phonetic word-level timestamps and speaker diarization.",
    metric: "Phoneme-level accuracy",
    status: "Active Stem"
  },
  {
    step: "02",
    title: "Emotion & Prosody Tagging",
    model: "emotion2vec+",
    description: "Extracts latent emotion vectors, pitch (F0) contours, and acoustic intensity per sentence to guide expressiveness.",
    metric: "9 emotional states detected",
    status: "Latent Analysis"
  },
  {
    step: "03",
    title: "Context-Aware Translation",
    model: "Gemini / Claude with Dynamic Glosssary",
    description: "Translates dialogue into target languages preserving cultural nuances, character constraints, and syllable timing.",
    metric: "Isomorphic length matching",
    status: "Syntactic Engine"
  },
  {
    step: "04",
    title: "Fine-Tuned Voice Synthesis",
    model: "MOSS-TTS 8B (LoRA Fine-Tuned)",
    description: "Generates natural speech conditioned on cloned speaker identity and source emotion vectors (trained on A100 GPU).",
    metric: "322-clip fine-tuned adapter",
    status: "Neural Rendering"
  },
  {
    step: "05",
    title: "Acoustic Fidelity & Timing Alignment",
    model: "Dynamic Time Warping (DTW) & EBU R128",
    description: "Evaluates F0 contour and rhythm alignment against reference audio, mastering dialogue stems at -23 LUFS.",
    metric: "DTW Emotion Score",
    status: "Broadcast Ready"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "rian-dubbing",
    title: "Rian Dubbing Platform",
    tagline: "Commercial AI video & audio dubbing suite supporting 100+ languages with line-level editing.",
    category: "speech",
    metrics: [
      { label: "Memory Optimization", value: "74% RAM drop" },
      { label: "Storage Reduction", value: "95% FLAC savings" },
      { label: "Language Coverage", value: "100+ Languages" }
    ],
    description: "Production web platform built on ElevenLabs Projects API v2. Features silence-aware VAD segmentation to eliminate unnecessary API dubbing costs, streaming chunk processors to prevent OOM failures on long media, and an in-browser timeline editor for reviewing transcriptions and revoicing single lines.",
    architecture: ["FastAPI", "React", "TypeScript", "AWS App Runner", "PostgreSQL", "AWS S3", "ffmpeg"],
    features: [
      "Chunked audio streaming pipeline preventing memory spikes on 20+ min videos",
      "VAD silence trimming ensuring only spoken dialogue is sent to translation APIs",
      "Line-level editor for manual subtitle correction and single-line revoicing",
      "Lossless FLAC master storage with automated on-demand WAV/MP3 delivery"
    ],
    featured: true
  },
  {
    id: "rian-self-serve",
    title: "Rian Self-Serve Document AI",
    tagline: "Live layout-preserving document translation platform monetized via prepaid Razorpay wallet.",
    category: "platform",
    metrics: [
      { label: "Status", value: "Live in Production" },
      { label: "Pricing Model", value: "₹60/page billing" },
      { label: "Cloud Infra", value: "AWS ECS Fargate" }
    ],
    description: "A production translation platform live at riantranslate.com. Allows customers to upload complex PDFs, extract text with exact bounding box layout retention using Google Document AI and Adobe PDF Services, translate via Claude and Google Translate v3, edit in a visual canvas, and export print-ready DOCX and PDF.",
    architecture: ["FastAPI", "Astro", "React", "AWS ECS Fargate", "AWS SQS", "AWS RDS Postgres", "Razorpay"],
    features: [
      "Layout-preserving visual PDF/DOCX translation pipeline with coordinate mapping",
      "Decoupled asynchronous worker queue orchestrated via AWS SQS and ECS Fargate",
      "Interactive visual web editor for post-editing translated text boxes",
      "Prepaid wallet architecture with automated Razorpay webhook payment processing"
    ],
    liveUrl: "https://www.riantranslate.com",
    featured: true
  },
  {
    id: "voice-ai-agent",
    title: "Full-Duplex Voice AI Agent",
    tagline: "Ultra-low latency conversational voice agent with WebRTC streaming and instant barge-in.",
    category: "speech",
    metrics: [
      { label: "Latency", value: "< 500ms End-to-End" },
      { label: "Protocol", value: "WebRTC / LiveKit" },
      { label: "Interruption", value: "Zero-lag Barge-in" }
    ],
    description: "A real-time voice-to-voice AI agent built with LiveKit and WebRTC. Achieves human-like conversational responsiveness with sub-500ms total latency. Implements client-side and server-side voice activity detection (Silero VAD) to instantly detect user interruption ('barge-in'), killing outbound audio buffers in real-time.",
    architecture: ["Python", "LiveKit", "WebRTC", "Silero VAD", "Whisper", "ElevenLabs / FastSpeech"],
    features: [
      "Full-duplex real-time bidirectional streaming over WebRTC channels",
      "Sub-500ms voice loop (Audio Input → STT → LLM generation → TTS streaming)",
      "Instant interruption detection via Silero VAD with client audio flush",
      "Zero-latency jitter buffer adaptation for fluid continuous speech"
    ],
    githubUrl: "https://github.com/Vish178/Realtime-Voice-AI-Agent",
    featured: true
  },
  {
    id: "leadgen-tool",
    title: "AI Works — Multi-Agent Lead Engine",
    tagline: "Autonomous B2B intelligence and outreach engine with 12 background loops.",
    category: "agents",
    metrics: [
      { label: "Worker Loops", value: "12 Asynchronous" },
      { label: "Channels", value: "LinkedIn, WhatsApp, Email" },
      { label: "Frontend", value: "Next.js 15 Turbopack" }
    ],
    description: "Comprehensive B2B prospecting platform running on AWS Lightsail. Executes continuous autonomous background tasks including Apollo prospect discovery, LLM lead warmth scoring, tenant-scoped CRM syncing, and multi-channel sequence dispatching via Unipile APIs.",
    architecture: ["FastAPI", "Next.js 15", "Redis", "Celery", "PostgreSQL", "Unipile API", "Apollo API", "Caddy"],
    features: [
      "12 concurrent background worker loops for scheduling, cadence advancement, and polling",
      "Multi-channel unified outreach engine supporting Email, LinkedIn, and WhatsApp",
      "Dynamic tenant isolation and fine-grained sales representative ownership controls",
      "Resilient systemd deployment on AWS Lightsail with automated Redis health heartbeats"
    ],
    githubUrl: "https://github.com/Vish178",
    featured: true
  },
  {
    id: "lectern",
    title: "Lectern — PDF to Audiobook Engine",
    tagline: "Turns uploaded books into streaming audiobooks with Claude Opus prompt caching.",
    category: "speech",
    metrics: [
      { label: "LLM Director", value: "Claude Opus 4.7" },
      { label: "Streaming", value: "ElevenLabs Gapless" },
      { label: "Audio Delivery", value: "WebSockets" }
    ],
    description: "Converts entire books into background-rendered audiobooks. Claude Opus 4.7 analyzes the narrative tone and suggests matching voices from ElevenLabs. Chunks stream via WebSockets into a client-side gapless queue so listeners can start hearing chapters immediately.",
    architecture: ["FastAPI", "React", "TypeScript", "Zustand", "WebSockets", "Claude Opus", "ElevenLabs"],
    features: [
      "Claude Opus prompt caching for cost-effective narrative analysis & voice recommendations",
      "Real-time character cost calculation engine before starting TTS rendering",
      "Client-side gapless audio playback queue managed through Zustand",
      "Per-book WebSocket rooms broadcasting render chunk progress to active clients"
    ],
    githubUrl: "https://github.com/Vish178",
    featured: false
  },
  {
    id: "the-researcher",
    title: "The Researcher — Autonomous Tech Digest",
    tagline: "Autonomous AI research agent generating daily executive engineering digests.",
    category: "agents",
    metrics: [
      { label: "Engine", value: "Groq / GPT-OSS-120B" },
      { label: "Delivery", value: "Automated Telegram" },
      { label: "Orchestration", value: "GitHub Actions" }
    ],
    description: "An automated intelligence pipeline that crawls arXiv, Hacker News, LocalLLaMA, and AI lab feeds. Uses high-throughput LLM summarization with strict JSON validation to create concise daily technical debriefs transmitted to mobile devices via Telegram.",
    architecture: ["Python", "Groq API", "Telegram Bot API", "GitHub Actions"],
    features: [
      "Automated multi-source aggregation from top machine learning feeds and arXiv",
      "Strict JSON schema validation with automated exponential backoff retries",
      "Clean HTML message rendering delivered directly to Telegram subscribers",
      "Serverless zero-maintenance cron execution on GitHub Actions"
    ],
    githubUrl: "https://github.com/Vish178",
    featured: false
  },
  {
    id: "legal-rag",
    title: "Legal RAG API",
    tagline: "Containerized semantic search API for Indian Constitutional & Criminal law.",
    category: "fullstack",
    metrics: [
      { label: "Vector DB", value: "ChromaDB" },
      { label: "Routing", value: "Domain Routing" },
      { label: "Packaging", value: "Custom Docker" }
    ],
    description: "Production legal assistant answering Indian Constitutional, Criminal, and Labour law queries. Features an intelligent domain classifier that routes queries to specialized vector indexes and cites exact statutory sections to ground answers and prevent hallucination.",
    architecture: ["FastAPI", "LangChain", "ChromaDB", "Docker", "PyTorch CPU"],
    features: [
      "Domain-specific query routing between constitutional, criminal, and labour corpuses",
      "Explicit statutory section citation grounding LLM answers against hallucinations",
      "Optimized lightweight Docker container with baked weights for rapid container startup"
    ],
    githubUrl: "https://github.com/Vish178/legal-rag-api",
    featured: false
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "R&D Engineer",
    company: "Rikaian Technology Pvt. Ltd.",
    companyUrl: "https://www.riantranslate.com",
    period: "Feb 2026 — Present",
    location: "Pune, India",
    highlights: [
      "Architected and deployed end-to-end commercial AI Dubbing platform (FastAPI, React, AWS App Runner, S3, PostgreSQL) supporting 100+ languages with automated subtitle alignment and per-line voice editing.",
      "Eliminated production OOM failures by engineering a chunked audio streaming pipeline, slashing peak RAM by 74% (1.9 GB → 0.49 GB) on 20+ minute tracks.",
      "Reduced cloud storage footprint by 95% by transitioning master asset storage to lossless FLAC with on-demand transcode delivery.",
      "Cut third-party dubbing API expenses by implementing silence-aware VAD segmentation to process only vocal activity, re-inserting dubbed stems at original timestamps.",
      "Co-developed Rian Self-Serve (riantranslate.com): production layout-preserving document translation platform on AWS ECS Fargate, SQS, Claude, and Document AI with Razorpay wallet billing.",
      "Researched an emotion-aware Speech-to-Speech Translation (S2ST) pipeline utilizing WhisperX and emotion2vec+; trained LoRA adapters for MOSS-TTS 8B on an A100 GPU and established DTW-based emotion preservation scoring."
    ]
  },
  {
    role: "AI Intern",
    company: "EduSkill Foundation",
    period: "Jul 2024 — Sep 2024",
    location: "Remote",
    highlights: [
      "Engineered a mobile-optimized real-time object detection module operating at 30 FPS for edge visual analysis.",
      "Integrated Google Cloud Vision API with quantization and pruning pipelines, attaining 92% visual recognition accuracy while minimizing on-device latency.",
      "Streamlined data preprocessing and model evaluation benchmarks for edge deployment constraints."
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Generative AI & Speech Systems",
    icon: "Mic",
    skills: [
      "WhisperX & Phoneme Alignment",
      "ElevenLabs API & Dubbing Projects v2",
      "MOSS-TTS 8B & RVC",
      "LoRA Fine-Tuning (Colab A100)",
      "emotion2vec+ & Prosody Extraction",
      "LiveKit & WebRTC Streaming",
      "Silero VAD (Voice Activity Detection)",
      "RAG (LangChain, ChromaDB, FAISS)",
      "Claude & Gemini APIs",
      "Prompt Caching"
    ]
  },
  {
    title: "Backend & Systems Infrastructure",
    icon: "Server",
    skills: [
      "Python 3.11+ & FastAPI",
      "AWS ECS Fargate & SQS",
      "AWS App Runner & S3",
      "AWS RDS & PostgreSQL",
      "Redis & Background Workers (12 loops)",
      "Celery & Task Orchestration",
      "SQLAlchemy & Alembic",
      "Docker & Container Optimization",
      "WebSockets & Server-Sent Events (SSE)",
      "Caddy & Nginx Reverse Proxies"
    ]
  },
  {
    title: "Machine Learning & Media Engineering",
    icon: "Activity",
    skills: [
      "PyTorch & Scikit-Learn",
      "Hugging Face Transformers",
      "OpenCV & MediaPipe",
      "ffmpeg & ffprobe Audio Mastering",
      "librosa & Acoustic Analysis",
      "EBU R128 (-23 LUFS) Normalization",
      "Dynamic Time Warping (DTW)",
      "Model Quantization & Pruning"
    ]
  },
  {
    title: "Frontend & Full-Stack Tools",
    icon: "Layout",
    skills: [
      "TypeScript & JavaScript (ESNext)",
      "React 18/19 & Next.js 15",
      "Vite & Turbopack",
      "Tailwind CSS & Modern Design Systems",
      "Zustand & State Management",
      "Astro Web Framework",
      "Git & GitHub Actions CI/CD",
      "Unipile Multi-Channel Messaging"
    ]
  }
];

export const PUBLICATION = {
  title: "Review of Home Automation Using ML for Gesture Control and Safety Detection",
  journal: "International Journal of Data Science and Artificial Intelligence (IJDSAI)",
  year: "2024",
  authors: "V. Kaushal, P. Raut, S. Amalraj",
  url: "https://kitspress.com/journals/IJDSAI/index.php?info=15&manuscriptid=89",
  summary: "Comprehensive survey evaluating real-time machine learning gesture classification models and edge safety detection frameworks for smart home embedded environments."
};

export const EDUCATION = {
  degree: "B.E. in Computer Engineering",
  institution: "KJ College of Engineering and Management Research (KJCOEMR), Pune",
  period: "2021 — 2025",
  cgpa: "8.04 / 10",
  coursework: "Data Structures & Algorithms, Operating Systems, Computer Networks, Machine Learning, Database Management Systems"
};


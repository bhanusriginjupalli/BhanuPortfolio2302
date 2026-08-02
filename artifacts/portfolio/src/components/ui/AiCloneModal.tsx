import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiCloneModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Knowledge base ────────────────────────────────────────────────────────────
const KB = {
  name: "Bhanu Sri Ginjupalli",
  contact: "📧 bhanusriginjupalli@gmail.com | 📞 +91 7993917493 | 📍 Bengaluru, India\nLinkedIn: linkedin.com/in/bhanusriginjupalli | GitHub: github.com/bhanusriginjupalli",
  education: "BTech in Computer Science & Artificial Intelligence Engineering at Amrita Vishwa Vidyapeetham, Bengaluru (2023–2027). Current CGPA: 8.35 / 10.",
  cgpa: "My CGPA is 8.35 out of 10 at Amrita Vishwa Vidyapeetham, Bengaluru, pursuing BTech in CS & AI Engineering (2023–2027).",
  roles: "I'm actively open to three types of roles:\n\n1. 🤖 AI / ML Engineer — my primary focus (computer vision, deep learning, LLMs)\n2. 💻 Software Engineer (SWE) — full-stack & backend\n3. ☁️ DevOps & Cloud Practitioner — Kubernetes, Terraform, AWS/GCP infrastructure",
  skills: `My core technical skills:

🧠 AI/ML: PyTorch, TensorFlow, OpenCV, HuggingFace, CUDA, LLMs, RAG, NLP, YOLO, UNet, GNNs, GANs, Stable Diffusion, Scikit-learn, Keras
☁️ Cloud/DevOps: Docker, Kubernetes, AWS (EKS, EC2, IAM, VPC), GCP, Terraform, CI/CD, Grafana, Prometheus, GitHub Actions
💻 Languages: Python, Java, C, C++, Golang, JavaScript, Scala, Bash, MATLAB
📊 Data: Apache Spark, PySpark, SQL, MySQL, MongoDB, PowerBI, DBMS`,
  experience: `My internship experience:

1. Testing Intern – Generative AI Learning Platform
   KrtrimAIQ Cognitive Solutions | Dec 2025 – Mar 2026
   • Tested a Generative AI Learning Platform end-to-end, identifying critical bugs
   • Collaborated with dev teams to document and resolve software issues

2. Summer Intern – AI and Cloud Computing
   Edunet Foundation / IBM SkillsBuild | Jun 2024 – Jul 2024
   • Completed IBM SkillsBuild program with hands-on IBM Cloud experience
   • Built cloud-based applications with AI/ML workflows in an Agile environment`,
  projects: `My 9 major projects:

1. 🌐 Carbon-Aware K8s Scheduler for HPC — AWS EKS + GPU nodes + carbon-aware scheduling + Terraform IaC [DELCON 2026]
2. 🏥 MediBridge – Health Management System — Flask + MySQL full-stack health card app [ICPCSN 2026]
3. 🦾 Robotic Grasping (6-DoF) — UNet++ + CBAM + Soft Attention for instance segmentation & pose estimation
4. 📈 LLM Geopolitical Risk Forecasting — BART + FinBERT + XGBoost (98% accuracy) + SHAP dashboard
5. 🦠 Epidemiological Modeling — Disease spread simulation using Graphs, BSTs, Priority Queues, and OOP
6. 🎬 Visual Composition for Filmography — CNN + GNN + YOLOv8 for scene structure analysis
7. 🎨 Facial Sketch Generation — Stable Diffusion + ControlNet + Pix2Pix text-to-face pipeline
8. ♿ Braille Communication System — Multi-modal CNN + speech emotion recognition for accessibility
9. 💹 Economic Stress Early Warning — Apache Spark ETL + ESI + PowerBI dashboards`,
  publications: "I have two research publications:\n1. DELCON 2026 — Carbon-Aware Multi-Tenant Kubernetes Scheduler for HPC\n2. ICPCSN 2026 — MediBridge: Smart Medication Management & Digital Health Card",
  certifications: `My certifications include:
• Google Professional Cloud DevOps Engineer
• Google Cloud Cybersecurity Certificate
• Code Vipassana S10 – Data-driven AI Agents (Google Developer Groups) — built agents with Google Cloud ADK, MCP Toolbox, BigQuery, AlloyDB
• AWS Academy Cloud Foundations
• MATLAB: Computer Vision, Deep Learning & Image Processing
• AI & ML in MATLAB using Python (MathWorks)
• Microsoft AI Skills Challenge
• Getting Started with Enterprise-grade AI – IBM`,
  leadership: `My leadership & achievements:
• President – Amrita Center for Entrepreneurship
• Smart India Hackathon (SIH) 2024 participant
• Bharatiya Antariksh Hackathon 2026
• TATA AgriDISQ 2024 Finalist
• Harvest School Hackathon Mentor 2024
• GSSoC'24 (GirlScript Summer of Code) contributor`,
  availability: "I'm actively looking for full-time roles, internships, and research collaborations in AI/ML Engineering, Software Engineering, and Cloud/DevOps. Feel free to reach out at bhanusriginjupalli@gmail.com or connect on LinkedIn.",
  kubernetes: "I built a Carbon-Aware Multi-Tenant Kubernetes Scheduler for HPC (published at DELCON 2026). It runs a multi-tenant cluster on AWS EKS with GPU-optimized nodes, integrates real-time carbon intensity APIs for green scheduling, uses Terraform for IaC, and has a full CI/CD pipeline with DCGM-based GPU monitoring via Grafana.",
  medibridge: "MediBridge is a full-stack smart medication management and digital health card system I built (published at ICPCSN 2026). It uses Flask + MySQL with authentication, medication tracking, digital health records, and appointment management — designed for accessibility and simplicity.",
  robotics: "My robotic grasping project uses UNet++ with CBAM (Convolutional Block Attention Module) and Soft Attention for instance segmentation and 6-DoF pose estimation in cluttered environments. Built in PyTorch for real-world robotic manipulation pipelines.",
  llm: "I built an LLM-based geopolitical intelligence and financial risk forecasting system. It uses a BART + FinBERT pipeline for geopolitical risk scoring, XGBoost for financial forecasting with 98% classification accuracy and R² of 0.825, plus a Streamlit dashboard with SHAP explainability.",
  epidemiology: "I built an Epidemiological Modeling and Disease Surveillance System using OOP and DSA. It simulates disease spread across populations using graphs, priority queues, linked lists, and binary search trees. The system models infection propagation, recovery dynamics, vaccination rollouts, and quarantine strategies.",
  filmography: "I developed a computer vision framework for visual composition in filmography. It uses CNN + GNN + YOLOv8 to analyze and model the structural composition of video frames, representing scenes as graphs to understand cinematographic patterns.",
  face: "I built a facial sketch generation pipeline that takes a text description and produces a realistic face image. It uses Stable Diffusion as the backbone, ControlNet for structure guidance, and Pix2Pix GAN for refinement — a multi-stage generative system.",
  braille: "My Braille communication system is a multi-modal assistive technology that combines speech emotion recognition (using Mel spectrograms) with CNN-based Braille character recognition — making communication more accessible for visually and hearing-impaired users.",
  economic: "I built an early warning system for regional economic stress using Apache Spark for ETL, constructed an Economic Stress Index (ESI) from multiple indicators, performed time-series correlation analysis, and visualized results in interactive PowerBI dashboards.",
};

// ─── Matcher ───────────────────────────────────────────────────────────────────
function getResponse(input: string): string {
  const q = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|what'?s up|yo)\b/.test(q)) {
    return "Hey there! I'm Bhanu's AI Clone 👋 — ask me about her skills, projects, experience, certifications, or how to get in touch. What would you like to know?";
  }

  // Farewells
  if (/\b(bye|goodbye|see you|thanks|thank you|that'?s all|done|cheers)\b/.test(q)) {
    return "Thanks for stopping by! Feel free to reach out to Bhanu directly at bhanusriginjupalli@gmail.com. Good luck! 🚀";
  }

  // Identity
  if (/\b(who are you|what are you|your name|introduce|about you)\b/.test(q)) {
    return `I'm the AI Clone of Bhanu Sri Ginjupalli — a CS & AI undergrad at Amrita Vishwa Vidyapeetham (CGPA 8.35), actively open to roles in AI/ML, Software Engineering, and DevOps/Cloud.\n\n${KB.contact}`;
  }

  // Contact
  if (/\b(contact|email|phone|reach|linkedin|github|social|connect)\b/.test(q)) {
    return `Here's how to reach Bhanu:\n\n${KB.contact}`;
  }

  // Education
  if (/\b(education|college|university|degree|study|studying|amrita|cgpa|gpa|grade|marks|score)\b/.test(q)) {
    return KB.cgpa + "\n\n" + KB.education;
  }

  // Availability / hiring
  if (/\b(available|open to|looking for|hire|hiring|job|opportunity|internship|full.?time|position|recruit)\b/.test(q)) {
    return KB.availability;
  }

  // Roles
  if (/\b(role|roles|position|field|domain|focus|specializ|career|interest|apply|applying)\b/.test(q)) {
    return KB.roles;
  }

  // Skills overview
  if (/\b(skill|tech stack|technologies|tools|languages|framework|what can|expertise|proficient|know)\b/.test(q) && !/project|specific/.test(q)) {
    return KB.skills;
  }

  // Experience
  if (/\b(experience|intern|internship|work|worked|job|company|krtrim|edunet|ibm|employment)\b/.test(q)) {
    return KB.experience;
  }

  // Specific project: Kubernetes / HPC
  if (/\b(kubernetes|k8s|hpc|carbon|eks|gpu|terraform|scheduler|delcon)\b/.test(q)) {
    return KB.kubernetes;
  }

  // Specific project: MediBridge
  if (/\b(medibridge|health|medication|flask|icpcsn|digital health)\b/.test(q)) {
    return KB.medibridge;
  }

  // Specific project: Robotics
  if (/\b(robot|robotic|grasping|unet|pose|segmentation|6.?dof|cbam)\b/.test(q)) {
    return KB.robotics;
  }

  // Specific project: LLM / Finance
  if (/\b(llm|geopolitical|finance|financial|finbert|bart|xgboost|risk|forecasting|shap)\b/.test(q)) {
    return KB.llm;
  }

  // Specific project: Epidemiology
  if (/\b(epidem|disease|spread|surveillance|outbreak|infection|quarantine|vaccination|graph|bst|priority queue|oop|dsa)\b/.test(q)) {
    return KB.epidemiology;
  }

  // Specific project: Filmography
  if (/\b(film|cinemat|composit|yolov8|gnn|visual|scene|video)\b/.test(q)) {
    return KB.filmography;
  }

  // Specific project: Face generation
  if (/\b(face|facial|sketch|stable diffusion|controlnet|pix2pix|gan|generative)\b/.test(q)) {
    return KB.face;
  }

  // Specific project: Braille
  if (/\b(braille|accessibility|assistive|speech|emotion|mel|spectrogram)\b/.test(q)) {
    return KB.braille;
  }

  // Specific project: Economic
  if (/\b(economic|stress|spark|pyspark|powerbi|etl|esi|regional)\b/.test(q)) {
    return KB.economic;
  }

  // All projects
  if (/\b(project|built|build|work|portfolio|show|list|all)\b/.test(q)) {
    return KB.projects;
  }

  // Publications / research
  if (/\b(paper|publication|research|publish|conference|delcon|icpcsn)\b/.test(q)) {
    return KB.publications;
  }

  // Certifications
  if (/\b(certif|certificate|aws|gcp|google cloud|ibm|microsoft|matlab|credential)\b/.test(q)) {
    return KB.certifications;
  }

  // Leadership / achievements / hackathons
  if (/\b(leader|leadership|hack|hackathon|achievement|president|entrepreneurship|sih|gssoc|tata)\b/.test(q)) {
    return KB.leadership;
  }

  // Python / AI specific skill
  if (/\bpython\b/.test(q)) {
    return "Python is my primary language — I use it extensively for ML/DL (PyTorch, TensorFlow, Scikit-learn), data engineering (Apache Spark, Pandas, NumPy), scripting, Flask APIs, and automation.";
  }

  // PyTorch
  if (/\bpytorch\b/.test(q)) {
    return "I'm highly proficient in PyTorch — I've used it to build UNet++ models for robotic grasping, CNN architectures for Braille recognition, GNNs for visual composition analysis, and LLM fine-tuning pipelines.";
  }

  // AWS / Cloud
  if (/\b(aws|amazon|cloud|gcp|google cloud|azure)\b/.test(q)) {
    return "I work with AWS (EKS, EC2, IAM, VPC, CloudWatch) and GCP. I'm certified in AWS Academy Cloud Foundations and Google Professional Cloud DevOps Engineer. My K8s-HPC project runs on AWS EKS with Terraform infrastructure.";
  }

  // Strengths / summary
  if (/\b(strength|summary|best at|good at|tell me about|overview|background)\b/.test(q)) {
    return `Here's a quick overview of me:\n\n${KB.education}\n\nI'm strongest in AI/ML (computer vision, deep learning, LLMs) while also being capable in full-stack development and cloud/DevOps infrastructure. I have 2 research publications and real internship experience.\n\n${KB.roles}`;
  }

  // Fallback
  return `I'm not sure I have a specific answer for that, but here's a quick overview of what I can tell you about:\n\n• 🎓 Education & CGPA\n• 💼 Work experience & internships\n• 🔬 Projects (9 major ones!)\n• 🛠️ Skills & tech stack\n• 📜 Certifications\n• 🏆 Leadership & hackathons\n• 📬 How to contact Bhanu\n\nWhat would you like to know more about?`;
}

// ─── Simulated streaming ────────────────────────────────────────────────────────
function useStreamText() {
  const [displayed, setDisplayed] = useState('');
  const [streaming, setStreaming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stream = useCallback((full: string, onDone?: () => void) => {
    setDisplayed('');
    setStreaming(true);
    let i = 0;
    const tick = () => {
      i += Math.floor(Math.random() * 4) + 2; // 2–5 chars per tick
      if (i >= full.length) {
        setDisplayed(full);
        setStreaming(false);
        onDone?.();
      } else {
        setDisplayed(full.slice(0, i));
        timerRef.current = setTimeout(tick, 18);
      }
    };
    timerRef.current = setTimeout(tick, 60);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { displayed, streaming, stream };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AiCloneModal({ open, onClose }: AiCloneModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Bhanu's AI Clone. Ask me anything about her skills, projects, experience, or background. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const { displayed, streaming, stream } = useStreamText();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking, displayed]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || thinking || streaming) return;

    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    // Simulate "thinking" delay then stream the response
    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
      const answer = getResponse(text);
      setThinking(false);
      // Add placeholder message that gets filled by streaming
      setMessages((prev) => [...prev, { role: 'assistant', content: '__STREAMING__' }]);
      stream(answer, () => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: answer };
          return updated;
        });
      });
    }, delay);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "What are your strongest skills?",
    "Tell me about your projects",
    "What roles are you open to?",
    "How can I contact you?",
  ];

  const isResponding = thinking || streaming;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 flex flex-col bg-background border-l border-border shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-mono font-bold text-foreground text-sm">Bhanu's AI Clone</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                    <span className="text-xs text-muted-foreground font-mono">online · answers as Bhanu</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {messages.map((msg, i) => {
                const isStreamingMsg = msg.content === '__STREAMING__';
                const content = isStreamingMsg ? displayed : msg.content;
                const isLast = i === messages.length - 1;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'assistant' ? 'bg-primary/20 border border-primary/40' : 'bg-card border border-border'}`}>
                      {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-primary" /> : <User className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-mono whitespace-pre-wrap ${msg.role === 'assistant' ? 'bg-card border border-border text-foreground rounded-tl-sm' : 'bg-primary/20 border border-primary/30 text-foreground rounded-tr-sm'}`}>
                      {content}
                      {isStreamingMsg && isLast && (
                        <span className="inline-block w-2 h-[1em] bg-primary animate-pulse ml-0.5 align-middle" />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Thinking indicator */}
              {thinking && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-tl-sm flex items-center gap-1">
                    {[0, 1, 2].map((j) => (
                      <span key={j} className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 0); }}
                    className="text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-card/30">
              <div className="flex gap-3 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything about Bhanu..."
                  rows={1}
                  disabled={isResponding}
                  className="flex-1 resize-none bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors min-h-[46px] max-h-32 disabled:opacity-50"
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = 'auto';
                    t.style.height = Math.min(t.scrollHeight, 128) + 'px';
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isResponding}
                  className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono mt-2 text-center">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

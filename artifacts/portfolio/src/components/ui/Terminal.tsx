import { useState, useEffect, useRef } from 'react';

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'BhanuOS v2026.1 (multi-role-cluster)' },
    { type: 'output', text: "Type 'help', 'roles', 'skills', 'projects', 'hackathons'..." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, input]);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim() || isTyping) return;
    
    setHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}` }]);
    setIsTyping(true);
    setInput('');

    // Simulate thinking/typing delay
    await new Promise(r => setTimeout(r, 400));

    let output = '';
    switch (cmd.toLowerCase().trim()) {
      case 'help':
        output = `Available commands:\n  roles      - List my primary roles\n  skills     - Show technical stack\n  projects   - Display major projects\n  hackathons - View hackathon achievements\n  clear      - Clear terminal`;
        break;
      case 'roles':
        output = `[1] AI/ML Engineer (Primary)\n[2] Software Engineer (SWE)\n[3] DevOps & Cloud Practitioner`;
        break;
      case 'skills':
        output = `Languages: Python, Java, C/C++, JS, Go\nML: PyTorch, TF, OpenCV, YOLO, LLMs\nCloud: K8s, AWS, GCP, Docker, Terraform\nData: SQL, Spark, MongoDB`;
        break;
      case 'projects':
        output = `> Carbon-Aware K8s Scheduler (HPC)\n> MediBridge Health System\n> 6-DoF Robotic Grasping Model\n> LLM-Based Geopolitical Forecaster\n...and 3+ more systems.`;
        break;
      case 'hackathons':
        output = `> SIH 2024 Finalist\n> Bharatiya Antariksh Hackathon 2026\n> TATA AgriDISQ 2024 Finalist`;
        break;
      case 'clear':
        setHistory([]);
        setIsTyping(false);
        return;
      default:
        output = `zsh: command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { type: 'output', text: output }]);
    setIsTyping(false);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-[#050505] shadow-2xl flex flex-col font-mono text-sm h-[450px]">
      {/* Title bar */}
      <div className="h-10 bg-[#1e1e1e] flex items-center px-4 justify-between border-b border-border shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs text-muted-foreground">bhanu@cluster:~ ⌘ zsh</div>
        <div className="w-12"></div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 text-foreground/90 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-secondary' : 'text-foreground/80 whitespace-pre-line'}>
            {line.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-primary animate-pulse">Processing...</div>
        )}
        {!isTyping && (
          <div className="flex items-center text-secondary">
            <span className="mr-2">$</span>
            <span>{input}</span>
            <span className="w-2.5 h-4 bg-primary animate-pulse ml-1 inline-block"></span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-[#0a0a0a] border-t border-border flex flex-wrap gap-3 shrink-0">
        {['roles', 'skills', 'projects', 'hackathons', 'clear'].map(cmd => (
          <button 
            key={cmd}
            onClick={() => handleCommand(cmd)}
            disabled={isTyping}
            className="px-3 py-1.5 text-xs rounded border border-border bg-[#161b22] hover:bg-[#202731] hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground disabled:opacity-50"
          >
            ${cmd}
          </button>
        ))}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b949e;
        }
      `}</style>
    </div>
  );
}

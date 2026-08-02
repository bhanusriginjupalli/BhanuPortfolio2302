import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code2, Cloud } from 'lucide-react';
import InteractiveTerminal from '@/components/ui/Terminal';
import profileImg from '@assets/finalgoodphoto_1785679819175.png';

export default function Hero() {
  return (
    <section id="about" className="min-h-screen pt-12 md:pt-20 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/10">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-xs font-mono text-secondary">Open to AI/ML, SWE & DevOps / Cloud Roles</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="text-foreground">Bhanu Sri</span>
                <br />
                <span className="text-accent font-mono text-4xl md:text-6xl lg:text-7xl">Ginjupalli</span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Building scalable distributed systems, robust cloud infrastructure, and intelligent machine learning applications. Versatile Computer Science & AI undergraduate at Amrita Vishwa Vidyapeetham (CGPA 8.35) with a multi-disciplinary background spanning distributed systems, cloud computing, Kubernetes orchestration, Big Data analytics, and state-of-the-art machine learning & computer vision.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded border border-border bg-card font-mono text-sm flex items-center gap-2 text-foreground/90">
                <BrainCircuit className="w-4 h-4 text-primary" /> AI / ML Engineer
              </div>
              <div className="px-4 py-2 rounded border border-border bg-card font-mono text-sm flex items-center gap-2 text-foreground/90">
                <Code2 className="w-4 h-4 text-secondary" /> Software Engineer
              </div>
              <div className="px-4 py-2 rounded border border-border bg-card font-mono text-sm flex items-center gap-2 text-foreground/90">
                <Cloud className="w-4 h-4 text-accent" /> DevOps & Cloud
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects" className="px-6 py-3 rounded bg-primary text-primary-foreground font-mono font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                Explore Projects <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => {
                const term = document.getElementById('about');
                term?.scrollIntoView({ behavior: 'smooth' });
                // We could trigger terminal command here if we exposed a ref
              }} className="px-6 py-3 rounded border border-primary text-primary font-mono hover:bg-primary/10 transition-colors flex items-center gap-2">
                🤖 Chat With AI Clone
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { val: '8.35/10', label: 'CGPA' },
                { val: '7+ Major', label: 'Systems Built' },
                { val: 'SIH Finalist', label: 'Hackathons' },
                { val: '10+ Pro', label: 'Certifications' }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded border border-border bg-card/50 flex flex-col gap-1 hover:border-primary/50 transition-colors">
                  <span className="font-mono text-lg font-bold text-foreground">{stat.val}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:pl-8"
          >
            <div className="absolute -top-12 -right-4 w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-primary/50 overflow-hidden z-20 shadow-[0_0_30px_rgba(0,212,255,0.3)] bg-background">
              <img src={profileImg} alt="Bhanu Sri Ginjupalli" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            
            {/* Ambient glow behind terminal */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            
            <div className="relative z-10 w-full pt-16 md:pt-8">
              <InteractiveTerminal />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

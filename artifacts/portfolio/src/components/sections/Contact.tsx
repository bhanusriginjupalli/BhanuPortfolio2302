import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-primary/5 border-y border-border relative overflow-hidden">
      {/* Decorative noise/gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-6">
          Initiate Connection
        </h2>
        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
          Currently exploring full-time opportunities in AI/ML, Software Engineering, and Cloud DevOps. Whether you have a position available or just want to discuss tech, my inbox is open.
        </p>
        
        <a 
          href="mailto:bhanusriginjupalli@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded bg-primary text-primary-foreground font-mono font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
        >
          <Mail className="w-5 h-5" /> Say Hello
        </a>
      </div>
    </section>
  );
}

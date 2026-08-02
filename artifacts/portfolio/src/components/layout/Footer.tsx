import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm text-muted-foreground flex flex-col items-center md:items-start">
          <span className="text-foreground font-bold">Bhanu Sri Ginjupalli</span>
          <span>Building at the intersection of AI, Cloud & Systems.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/bhanusriginjupalli" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/bhanusriginjupalli" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:bhanusriginjupalli@gmail.com" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

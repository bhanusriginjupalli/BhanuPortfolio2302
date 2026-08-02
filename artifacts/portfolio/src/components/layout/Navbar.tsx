import { useState, useEffect } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { num: '01', name: 'about', href: '#about' },
    { num: '02', name: 'roles', href: '#roles' },
    { num: '03', name: 'skills', href: '#skills' },
    { num: '04', name: 'projects', href: '#projects' },
    { num: '05', name: 'leadership', href: '#leadership' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-background/80 backdrop-blur-md border-border py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-mono font-bold text-lg">
          <Terminal className="text-primary w-6 h-6" />
          <span className="text-foreground">
            [&gt;_] BHANU SRI.G <span className="text-muted-foreground font-normal text-sm hidden sm:inline">/ MULTI-ROLE ENGINEER</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="group font-mono text-sm flex items-center gap-1 hover:text-primary transition-colors">
              <span className="text-secondary group-hover:text-primary transition-colors">{link.num}.</span>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#about" className="px-4 py-2 rounded border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors">
            Ask AI Clone
          </a>
          <a href="#contact" className="px-4 py-2 rounded bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-colors">
            Get in Touch
          </a>
        </div>
        
        {/* Mobile Toggle */}
        <button className="lg:hidden text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-lg flex items-center gap-2"
                >
                  <span className="text-secondary">{link.num}.</span>
                  <span className="text-foreground">{link.name}</span>
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <a href="#about" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center rounded border border-primary text-primary font-mono text-sm">
                  Ask AI Clone
                </a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-center rounded bg-primary text-primary-foreground font-mono font-bold text-sm">
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not send right now. Please email directly at bhanusriginjupalli@gmail.com');
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary/5 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-primary">07.</span> initiate_connection
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
          <p className="text-muted-foreground max-w-xl leading-relaxed mt-2">
            Currently exploring full-time opportunities in AI/ML, Software Engineering, and Cloud DevOps. Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 h-72 rounded-xl border border-secondary/40 bg-card text-center p-10">
                <CheckCircle2 className="w-12 h-12 text-secondary" />
                <h3 className="font-mono text-xl font-bold text-foreground">Message sent!</h3>
                <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll reply to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-5 py-2 rounded-lg border border-border text-sm font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Where do you work? (optional)"
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about the opportunity, project, or just say hello..."
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive font-mono">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-xl border border-border bg-card space-y-5">
              <h4 className="font-mono font-bold text-foreground text-sm uppercase tracking-wider text-primary">Direct Contact</h4>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: 'bhanusriginjupalli@gmail.com', href: 'mailto:bhanusriginjupalli@gmail.com' },
                  { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: 'LinkedIn', value: 'bhanusriginjupalli', href: 'https://linkedin.com/in/bhanusriginjupalli' },
                  { icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>, label: 'GitHub', value: 'bhanusriginjupalli', href: 'https://github.com/bhanusriginjupalli' },
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors shrink-0">
                      <item.icon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{item.label}</div>
                      <div className="text-xs font-mono text-foreground group-hover:text-primary transition-colors truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <h4 className="font-mono font-bold text-foreground text-sm uppercase tracking-wider text-secondary">Open To</h4>
              {['AI / ML Engineer', 'Software Engineer (SWE)', 'DevOps & Cloud Roles', 'Research Collaborations'].map((role, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                  {role}
                </div>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                  Response time: within 24 hours
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

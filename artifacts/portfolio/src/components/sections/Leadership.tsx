import { motion } from 'framer-motion';
import { Award, Trophy, Code, Medal } from 'lucide-react';

export default function Leadership() {
  const events = [
    { title: "President", org: "Amrita Center for Entrepreneurship", icon: <Award className="w-5 h-5 text-primary" /> },
    { title: "Finalist", org: "Smart India Hackathon 2024", icon: <Trophy className="w-5 h-5 text-secondary" /> },
    { title: "Participant", org: "Bharatiya Antariksh Hackathon 2026", icon: <Code className="w-5 h-5 text-accent" /> },
    { title: "Finalist", org: "TATA AgriDISQ 2024", icon: <Trophy className="w-5 h-5 text-secondary" /> },
    { title: "Mentor", org: "Harvest School Hackathon 2024", icon: <Award className="w-5 h-5 text-primary" /> },
    { title: "Contributor", org: "GSSoC'24 (GirlScript Summer of Code)", icon: <Code className="w-5 h-5 text-accent" /> },
  ];

  const certs = [
    "Google Professional Cloud DevOps Engineer",
    "Code Vipassana S10 – Data-driven AI agents (Google Developer Groups)",
    "AWS Academy Cloud Foundations",
    "Google Cloud Cybersecurity Certificate",
    "MATLAB Computer Vision / Deep Learning / Image Processing Onramp",
    "Microsoft AI Skills Challenge",
    "Getting Started with Enterprise-grade AI (IBM)"
  ];

  return (
    <section id="leadership" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-secondary">05.</span> achievements
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Leadership & Hackathons */}
          <div>
            <h3 className="text-2xl font-mono font-bold mb-8 text-foreground flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" /> Roles & Hackathons
            </h3>
            <div className="space-y-4">
              {events.map((event, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    {event.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-mono text-foreground">{event.title}</h4>
                    <p className="text-muted-foreground text-sm">{event.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-mono font-bold mb-8 text-foreground flex items-center gap-3">
              <Medal className="w-6 h-6 text-secondary" /> Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {certs.map((cert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/30 hover:bg-card/80 transition-colors hover:border-secondary/50 group"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="font-mono text-sm text-foreground/90">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

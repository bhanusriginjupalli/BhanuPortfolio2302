import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Testing Intern – Generative AI Learning Platform',
    company: 'KrtrimAIQ Cognitive Solutions',
    period: 'Dec 2025 – Mar 2026',
    location: 'Bengaluru, India',
    type: 'Internship',
    color: 'border-primary/50',
    tagColor: 'text-primary bg-primary/10 border-primary/20',
    bullets: [
      'Executed comprehensive testing for a Generative AI Learning Platform, identifying critical bugs and ensuring platform stability and performance.',
      'Contributed to enhancing user experience by documenting and resolving software issues.',
      'Collaborated with development teams to validate fixes and implement improvements.',
    ],
    skills: ['Generative AI', 'QA Testing', 'Bug Tracking', 'Platform Stability'],
  },
  {
    role: 'Summer Intern – AI and Cloud Computing',
    company: 'Edunet Foundation (IBM SkillsBuild)',
    period: 'Jun 2024 – Jul 2024',
    location: 'Remote',
    type: 'Internship',
    color: 'border-secondary/50',
    tagColor: 'text-secondary bg-secondary/10 border-secondary/20',
    bullets: [
      'Completed a 4-week IBM SkillsBuild Internship with hands-on experience in IBM Cloud and cloud-based application development.',
      'Built a project while gaining exposure to cloud deployment, AI/ML workflows, and Agile collaboration.',
      'Worked with IBM Cloud services to architect and deploy scalable applications.',
    ],
    skills: ['IBM Cloud', 'AI/ML Workflows', 'Cloud Deployment', 'Agile'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-primary">02.</span> experience
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent hidden md:block"></div>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.15 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-5 top-6 w-7 h-7 rounded-full border-2 border-primary bg-background items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                </div>

                <div className={`p-7 rounded-xl border bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] ${exp.color}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="space-y-1.5">
                      <div className={`inline-block px-2.5 py-0.5 rounded border text-[11px] font-mono font-medium w-fit ${exp.tagColor}`}>
                        {exp.type}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground leading-tight">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
                        <span className="text-foreground/80 font-semibold">{exp.company}</span>
                        <span className="text-border">|</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed">
                        <span className="text-primary font-mono mt-0.5 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    {exp.skills.map((s, j) => (
                      <span key={j} className="px-2.5 py-1 bg-background rounded border border-border text-xs font-mono text-foreground/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

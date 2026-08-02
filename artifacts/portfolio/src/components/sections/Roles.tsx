import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function Roles() {
  const roles = [
    {
      title: "AI / ML Engineer",
      tag: "primary focus",
      desc: "Designing and deploying intelligent systems from data pipelines to production ML models. Specializing in computer vision, deep learning, and LLM applications.",
      skills: ["Python", "PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "HuggingFace", "CUDA", "RAG", "LLMs", "NLP", "YOLO", "UNet", "GNNs"],
      color: "border-primary/50",
      textColor: "text-primary"
    },
    {
      title: "Software Engineer",
      tag: "full-stack",
      desc: "Building robust, scalable backend systems and full-stack applications. Proficient in system design, APIs, databases, and distributed architectures.",
      skills: ["Python", "Java", "JavaScript", "Flask", "MySQL", "MongoDB", "REST APIs", "SQL", "SDLC", "Agile", "DSA"],
      color: "border-secondary/50",
      textColor: "text-secondary"
    },
    {
      title: "Cloud & DevOps",
      tag: "infrastructure",
      desc: "Architecting cloud-native infrastructure and automating deployment pipelines. Expert in Kubernetes orchestration, Terraform IaC, and multi-cloud environments.",
      skills: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "CI/CD", "Grafana", "Prometheus", "Linux", "CloudWatch"],
      color: "border-accent/50",
      textColor: "text-accent"
    }
  ];

  return (
    <section id="roles" className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-secondary">02.</span> roles_and_focus
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-xl border bg-card hover:bg-card/80 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${role.color}`}
            >
              <div className="inline-block px-3 py-1 rounded border border-border bg-background/50 text-xs font-mono text-muted-foreground w-fit mb-4">
                {role.tag}
              </div>
              <h3 className="text-2xl font-bold font-mono mb-4 text-foreground">{role.title}</h3>
              <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">{role.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {role.skills.map((skill, j) => (
                  <span key={j} className="px-2 py-1 bg-background rounded border border-border text-xs font-mono text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl border border-border bg-background flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-mono text-lg font-bold text-foreground">Tailored Resumes Available</h4>
            <p className="text-sm text-muted-foreground">Download format specific to your recruiting needs.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded bg-card hover:bg-card/80 border border-border font-mono text-sm transition-colors text-foreground group">
              <Download className="w-4 h-4 text-primary group-hover:-translate-y-1 transition-transform" /> AI_ML_Resume.pdf
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded bg-card hover:bg-card/80 border border-border font-mono text-sm transition-colors text-foreground group">
              <Download className="w-4 h-4 text-secondary group-hover:-translate-y-1 transition-transform" /> SWE_Resume.pdf
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded bg-card hover:bg-card/80 border border-border font-mono text-sm transition-colors text-foreground group">
              <Download className="w-4 h-4 text-accent group-hover:-translate-y-1 transition-transform" /> Cloud_Resume.pdf
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

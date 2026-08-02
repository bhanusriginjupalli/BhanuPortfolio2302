import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const roles = [
  {
    title: 'AI / ML Engineer',
    tag: 'primary focus',
    desc: 'Designing and deploying intelligent systems from data pipelines to production ML models. Specializing in computer vision, deep learning, and LLM applications.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'HuggingFace', 'CUDA', 'RAG', 'LLMs', 'NLP', 'YOLO', 'UNet', 'GNNs'],
    color: 'border-primary/50',
  },
  {
    title: 'Software Engineer (SWE)',
    tag: 'full-stack',
    desc: 'Building robust, scalable backend systems and full-stack applications. Proficient in system design, APIs, databases, and distributed architectures.',
    skills: ['Python', 'Java', 'JavaScript', 'Flask', 'MySQL', 'MongoDB', 'REST APIs', 'SQL', 'SDLC', 'Agile', 'DSA'],
    color: 'border-secondary/50',
  },
  {
    title: 'DevOps & Cloud Practitioner',
    tag: 'infrastructure',
    desc: 'Architecting cloud-native infrastructure and automating deployment pipelines. Expert in Kubernetes orchestration, Terraform IaC, and multi-cloud environments.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Grafana', 'Prometheus', 'Linux', 'CloudWatch'],
    color: 'border-accent/50',
  },
];

const resumes = [
  {
    label: 'Computer Vision & Deep Learning',
    sub: 'CV · Object Detection · PyTorch · CUDA',
    file: '/resumes/hyperverge-resume.pdf',
    color: 'text-primary',
  },
  {
    label: 'Robotics & Embedded CV',
    sub: 'Pose Estimation · 6-DoF · UNet · Segmentation',
    file: '/resumes/skylark-resume.pdf',
    color: 'text-primary',
  },
  {
    label: 'Data Science & ML Research',
    sub: 'NLP · LLMs · XGBoost · Streamlit · SHAP',
    file: '/resumes/sigmoid-resume.pdf',
    color: 'text-secondary',
  },
  {
    label: 'Systems & Distributed Computing',
    sub: 'HPC · Distributed Systems · Cloud · APIs',
    file: '/resumes/viasat-resume.pdf',
    color: 'text-secondary',
  },
  {
    label: 'Big Data & Analytics',
    sub: 'Apache Spark · PySpark · PowerBI · SQL',
    file: '/resumes/fractal-resume.pdf',
    color: 'text-accent',
  },
  {
    label: 'DevOps & Cloud Infrastructure',
    sub: 'Kubernetes · Terraform · AWS · CI/CD',
    file: '/resumes/finacplus-resume.pdf',
    color: 'text-accent',
  },
];

export default function Roles() {
  return (
    <section id="roles" className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-secondary">03.</span> roles_and_focus
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-xl border bg-card hover:bg-card/80 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${role.color}`}
            >
              <div className="inline-block px-3 py-1 rounded border border-border bg-background/50 text-xs font-mono text-muted-foreground w-fit mb-4">
                {role.tag}
              </div>
              <h3 className="text-2xl font-bold font-mono mb-4 text-foreground">{role.title}</h3>
              <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">{role.desc}</p>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, j) => (
                  <span key={j} className="px-2 py-1 bg-background rounded border border-border text-xs font-mono text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tailored Resume Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl border border-border bg-background shadow-xl"
        >
          <div className="mb-8">
            <h4 className="font-mono text-xl font-bold text-foreground mb-1">Tailored Resumes</h4>
            <p className="text-sm text-muted-foreground">Role-specific resumes — each tailored for a different domain and stack.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((r, i) => (
              <a
                key={i}
                href={r.file}
                download
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card hover:bg-card/80 border border-border hover:border-primary/40 font-mono text-sm transition-all duration-200 text-foreground group"
              >
                <Download className={`w-4 h-4 ${r.color} group-hover:-translate-y-0.5 transition-transform shrink-0`} />
                <div className="min-w-0">
                  <div className="font-semibold truncate text-[13px]">{r.label}</div>
                  <div className="text-[11px] text-muted-foreground truncate mt-0.5">{r.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

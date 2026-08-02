import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const GITHUB = 'https://github.com/bhanusriginjupalli';

const projects = [
  {
    title: 'Carbon-Aware Multi-Tenant Kubernetes Scheduler for HPC',
    desc: 'Multi-tenant K8s cluster on AWS EKS with GPU-optimized nodes, carbon-aware scheduling framework, CI/CD pipeline with Terraform IaC, comprehensive GPU monitoring.',
    tags: ['Kubernetes', 'AWS EKS', 'Terraform', 'Python', 'HPC', 'CI/CD'],
    badge: 'DELCON 2026 Publication',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Server infrastructure and cloud computing',
  },
  {
    title: 'MediBridge – Smart Medication Management & Digital Health Card',
    desc: 'Full-stack health management system with medication tracking, digital health records, Flask APIs, MySQL database. Published at ICPCSN 2026.',
    tags: ['Flask', 'MySQL', 'JavaScript', 'Full Stack', 'Healthcare'],
    badge: 'ICPCSN 2026 Publication',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Healthcare and medical technology',
  },
  {
    title: 'Instance Segmentation & Pose Estimation for 6-DoF Robotic Grasping',
    desc: 'Deep learning UNet++ model with CBAM and Soft Attention mechanisms for robotic object detection in cluttered environments.',
    tags: ['PyTorch', 'UNet++', 'CBAM', 'Computer Vision', 'Robotics'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Robotic arm and automation',
  },
  {
    title: 'LLM-Based Geopolitical Intelligence & Financial Risk Forecasting',
    desc: 'BART + FinBERT pipeline for geopolitical risk analysis, XGBoost forecasting with 98% accuracy, Streamlit dashboard with SHAP explainability.',
    tags: ['BART', 'FinBERT', 'XGBoost', 'LLM', 'NLP', 'Streamlit'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Financial data and trading charts',
  },
  {
    title: 'Epidemiological Modeling & Disease Surveillance System',
    desc: 'Disease spread simulation using object-oriented programming and advanced data structures — graphs, priority queues, linked lists, and BSTs to model population interactions with infection propagation, recovery, vaccination, and quarantine strategies.',
    tags: ['Python', 'OOP', 'Graphs', 'BST', 'Priority Queue', 'DSA', 'Simulation'],
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Epidemiology and disease modeling',
  },
  {
    title: 'Learning Visual Composition as Structure: CV Framework for Filmography',
    desc: 'CNN + GNN + YOLOv8 framework for modeling visual composition in video frames, graph-based scene representation pipeline.',
    tags: ['YOLOv8', 'GNN', 'CNN', 'PyTorch', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Filmography and visual composition',
  },
  {
    title: 'Facial Sketch Generation from Description using ML',
    desc: 'Multi-stage generative pipeline converting textual descriptions into realistic face images using Stable Diffusion, ControlNet, and Pix2Pix GANs.',
    tags: ['Stable Diffusion', 'ControlNet', 'GANs', 'Pix2Pix', 'Generative AI'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'AI generated faces and generative models',
  },
  {
    title: 'Audio-Visual Integration for Emotion-Aware Braille Communication',
    desc: 'Multi-modal assistive system with speech emotion recognition (Mel spectrograms) and CNN-based Braille character recognition for accessibility.',
    tags: ['CNN', 'Speech Processing', 'Mel Spectrogram', 'Accessibility'],
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Accessibility and braille communication',
  },
  {
    title: 'Early Warning System for Regional Economic Stress',
    desc: 'Apache Spark ETL pipeline with Economic Stress Index (ESI), time-series analysis, correlation analysis, and interactive Power BI dashboards.',
    tags: ['Apache Spark', 'PySpark', 'PowerBI', 'Big Data', 'Linear Regression'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Economic data analytics and business intelligence',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-card/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-accent">05.</span> selected_works
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group relative rounded-xl border border-border bg-background flex flex-col h-full hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-50 group-hover:brightness-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
                {project.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-secondary/90 text-background border border-secondary/20 rounded text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-sm">
                    {project.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors border border-border/50 hover:border-primary/50"
                    title="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors border border-border/50 hover:border-primary/50"
                    title="View project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold font-mono mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border/50">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-mono text-muted-foreground bg-card px-2 py-0.5 rounded border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 font-mono text-sm transition-all duration-300 text-foreground group"
          >
            <Github className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            View all repositories on GitHub
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

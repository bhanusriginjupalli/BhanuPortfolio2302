import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Carbon-Aware Multi-Tenant Kubernetes Scheduler for HPC",
      desc: "Multi-tenant K8s cluster on AWS EKS with GPU-optimized nodes, carbon-aware scheduling framework, CI/CD pipeline with Terraform IaC, comprehensive GPU monitoring.",
      tags: ["Kubernetes", "AWS EKS", "Terraform", "Python", "HPC", "CI/CD", "Carbon Awareness"],
      badge: "DELCON 2026 Publication"
    },
    {
      title: "MediBridge – Smart Medication Management & Digital Health Card",
      desc: "Full-stack health management system with medication tracking, digital health records, Flask APIs, MySQL database.",
      tags: ["Flask", "MySQL", "HTML/CSS/JS", "Full Stack", "Healthcare"],
      badge: "ICPCSN 2026 Publication"
    },
    {
      title: "Instance Segmentation & Pose Estimation for 6-DoF Robotic Grasping",
      desc: "Deep learning UNet++ model with CBAM attention mechanisms for robotic object detection in cluttered environments.",
      tags: ["PyTorch", "UNet++", "Computer Vision", "CBAM", "Robotics"]
    },
    {
      title: "LLM-Based Geopolitical Intelligence & Financial Risk Forecasting",
      desc: "BART + FinBERT pipeline for geopolitical risk analysis, XGBoost forecasting with 98% accuracy, Streamlit dashboard with SHAP explainability.",
      tags: ["BART", "FinBERT", "XGBoost", "LLM", "NLP", "Streamlit", "SHAP"]
    },
    {
      title: "Learning Visual Composition as Structure: CV Framework for Filmography",
      desc: "CNN + GNN + YOLOv8 framework for modeling visual composition in video frames, graph-based scene representation.",
      tags: ["YOLOv8", "GNN", "CNN", "PyTorch", "OpenCV", "PyTorch Geometric"]
    },
    {
      title: "Facial Sketch Generation from Description using ML",
      desc: "Multi-stage generative pipeline using Stable Diffusion, ControlNet, and Pix2Pix GANs for text-to-face generation.",
      tags: ["Stable Diffusion", "ControlNet", "GANs", "Pix2Pix", "Generative AI"]
    },
    {
      title: "Audio-Visual Integration for Emotion-Aware Braille Communication",
      desc: "Multi-modal system with speech emotion recognition (Mel spectrograms) and CNN-based Braille character recognition for accessibility.",
      tags: ["CNN", "Speech Processing", "Accessibility", "Multi-modal AI"]
    },
    {
      title: "Early Warning System for Regional Economic Stress",
      desc: "Apache Spark ETL pipeline with Economic Stress Index, time-series analysis, Power BI dashboards.",
      tags: ["Apache Spark", "PowerBI", "PySpark", "Big Data", "Linear Regression"]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-card/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-accent">04.</span> selected_works
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-xl border border-border bg-background flex flex-col h-full hover:border-primary/50 transition-colors overflow-hidden z-10"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10 pointer-events-none"></div>
              
              <div className="flex items-start justify-between mb-6">
                <FolderGit2 className="w-10 h-10 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              
              <h3 className="text-xl font-bold font-mono mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              
              {project.badge && (
                <div className="inline-block px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded text-[11px] font-mono w-fit mb-4 uppercase tracking-wider">
                  {project.badge}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-xs font-mono text-muted-foreground bg-card px-2 py-1 rounded border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

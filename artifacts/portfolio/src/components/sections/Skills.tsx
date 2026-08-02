import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: ["Python", "Java", "C", "C++", "Golang", "JavaScript", "Scala", "Bash", "Groovy", "MATLAB"]
    },
    {
      name: "AI / ML Stack",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "NumPy", "Pandas", "Keras", "Ultralytics", "seaborn", "scipy", "HuggingFace", "CUDA", "GNNs"]
    },
    {
      name: "ML Techniques",
      skills: ["Deep Learning", "Computer Vision", "Object Detection (YOLO)", "Instance Segmentation", "UNet", "ResNet", "Transformers", "CNNs", "Transfer Learning", "LLMs", "RAG", "NLP", "GANs", "Diffusion Models", "Fine-tuning", "OCR", "Feature Detection"]
    },
    {
      name: "Cloud & DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "CI/CD", "GitHub Actions", "Grafana", "Prometheus", "CloudWatch", "Linux", "Git", "DevOps"]
    },
    {
      name: "Data & Databases",
      skills: ["SQL", "MongoDB", "Apache Spark", "PySpark", "PowerBI", "MySQL", "DBMS", "Data Analytics"]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-foreground">
            <span className="text-primary">03.</span> tech_stack
          </h2>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="space-y-5"
            >
              <h3 className="font-mono text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary/50">&gt;</span> {category.name}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, j) => (
                  <span key={j} className="px-3 py-1.5 bg-card/50 rounded border border-border text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default select-none">
                    {skill}
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

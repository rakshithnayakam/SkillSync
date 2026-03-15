import mongoose from "mongoose";
import dotenv from "dotenv";
import Skill from "../models/skill.models.js";

dotenv.config({ path: "./.env" });

const skills = [
  // Programming Languages
  { name: "JavaScript", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "C++", category: "Programming" },
  { name: "C#", category: "Programming" },
  { name: "Go", category: "Programming" },
  { name: "Rust", category: "Programming" },
  { name: "Swift", category: "Programming" },
  { name: "Kotlin", category: "Programming" },
  { name: "TypeScript", category: "Programming" },
  { name: "PHP", category: "Programming" },
  { name: "Ruby", category: "Programming" },
  { name: "Dart", category: "Programming" },
  { name: "R", category: "Programming" },

  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "SASS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Svelte", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "NestJS", category: "Backend" },

  // Database
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Supabase", category: "Database" },

  // DevOps & Cloud
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "Google Cloud", category: "DevOps" },
  { name: "Azure", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Nginx", category: "DevOps" },

  // Mobile
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "Android Development", category: "Mobile" },
  { name: "iOS Development", category: "Mobile" },

  // AI & Data
  { name: "Machine Learning", category: "AI & Data" },
  { name: "Deep Learning", category: "AI & Data" },
  { name: "Data Science", category: "AI & Data" },
  { name: "TensorFlow", category: "AI & Data" },
  { name: "PyTorch", category: "AI & Data" },
  { name: "Computer Vision", category: "AI & Data" },
  { name: "NLP", category: "AI & Data" },
  { name: "Pandas", category: "AI & Data" },

  // Tools
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Jira", category: "Tools" },

  // Design
  { name: "UI/UX Design", category: "Design" },
  { name: "Graphic Design", category: "Design" },
  { name: "Adobe Photoshop", category: "Design" },
  { name: "Adobe Illustrator", category: "Design" },
  { name: "Canva", category: "Design" },

  // Soft Skills
  { name: "Public Speaking", category: "Soft Skills" },
  { name: "Leadership", category: "Soft Skills" },
  { name: "Project Management", category: "Soft Skills" },
  { name: "Communication", category: "Soft Skills" },
  { name: "Problem Solving", category: "Soft Skills" },

  // Other
  { name: "Blockchain", category: "Web3" },
  { name: "Solidity", category: "Web3" },
  { name: "Web3.js", category: "Web3" },
  { name: "Cybersecurity", category: "Security" },
  { name: "Ethical Hacking", category: "Security" },
  { name: "Game Development", category: "Gaming" },
  { name: "Unity", category: "Gaming" },
  { name: "Unreal Engine", category: "Gaming" },
];

const seedSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // delete existing skills
    await Skill.deleteMany({});
    console.log("🗑️ Cleared existing skills");

    // insert all skills
    await Skill.insertMany(skills);
    console.log(`✅ Added ${skills.length} skills successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding skills:", error);
    process.exit(1);
  }
};

seedSkills();

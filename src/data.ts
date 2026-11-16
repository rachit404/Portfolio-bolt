// All portfolio content lives here. Edit this file to update the site.
// Source: Rachit Doshi's resume.

export const profile = {
  name: "Rachit Doshi",
  roles: ["Full-Stack Developer", "AI/ML Enthusiast", "Frontend Mentor"],
  intro:
    "BTech student in Artificial Intelligence & Data Science who builds full-stack web applications, experiments with machine learning and retrieval-augmented workflows, and mentors others in frontend development.",
  cgpa: "9.2",
  resumePath: "/Rachit_Doshi_Resume.pdf",
};

export const contact = {
  email: "doshirachit28@gmail.com",
  phone: "+91-8097039637",
  phoneHref: "+918097039637",
  linkedin: {
    label: "linkedin.com/in/rachit-doshi404",
    url: "https://linkedin.com/in/rachit-doshi404",
  },
  github: {
    label: "rachit404",
    url: "https://github.com/rachit404",
  },
};

export const stats = [
  { label: "Internships", value: 4 },
  { label: "Projects", value: 4 },
  { label: "Certifications", value: 5 },
  { label: "Celestia participants", value: 200, suffix: "+" },
];

export const about = {
  bio: [
    "I am a BTech student in Artificial Intelligence & Data Science at DJ Sanghvi College of Engineering, currently maintaining a CGPA of 9.2.",
    "My work spans frontend development with React, backend APIs with Node.js, Express and Flask, and applied machine learning, from time series forecasting with LSTM and SARIMA to retrieval-augmented pipelines.",
    "Alongside my studies I mentor junior developers at the DJ Unicode club and have organized Celestia, the club's first major event.",
  ],
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  image: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Frontend Intern",
    company: "Tusta (Apt - Atypical Technologies Pvt. Ltd.)",
    period: "June 2025 - September 2025",
    image: "https://images.pexels.com/photos/8228578/pexels-photo-8228578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    location: "Remote",
    bullets: [
      "Translated Figma designs into pixel-perfect client-side UI while collaborating with product and design teams.",
      "Developed data tables with pagination and filtering, validation and error handling forms for reliable user input.",
      "Managed shared state using React useContext and integrated backend APIs with Axios to support dynamic workflows.",
    ],
  },
  {
    role: "Cloud Computing Intern",
    company: "WEBXELA",
    period: "June - September 2024",
    image: "https://images.pexels.com/photos/11129659/pexels-photo-11129659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    location: "Remote",
    bullets: [
      "Built foundational understanding of cloud service models, cloud deployment types, and IAM standards.",
      "Analyzed cloud pricing structures and services offered to identify cost-effective solutions across Azure, AWS, GCP.",
      "Contributed to internal documentation summarizing key cloud components, deployment strategies, and platform service comparisons.",
    ],
  },
  {
    role: "Cybersecurity Virtual Internship",
    company: "Palo Alto Networks",
    period: "April - June 2024",
    image: "https://images.pexels.com/photos/1787044/pexels-photo-1787044.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    location: "Online",
    bullets: [
      "Completed a 10-week AICTE Virtual Internship on Cybersecurity in collaboration with EduSkills, focusing on practical security concepts and industry-relevant skills.",
      "Earned specialized certifications in Cybersecurity, Cloud, Network, and Security Operations Fundamentals.",
      "Gained hands-on knowledge in core areas such as threat detection and incident response through structured expert-led modules.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Astrabite",
    period: "June - August 2023",
    image: "https://images.pexels.com/photos/18096357/pexels-photo-18096357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    location: "Mumbai",
    bullets: [
      "Developed websites for Production Houses and e-commerce companies using React.js, increasing traffic by 50%.",
    ],
  },
  {
    role: "Frontend Mentor",
    company: "DJ Unicode",
    period: "June 2023 - Present",
    image: "https://images.pexels.com/photos/14441135/pexels-photo-14441135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    bullets: [
      "Mentored multiple junior members in frontend development, providing tasks, resolving doubts, and fostering skill development, resulting in a 30% improvement in their coding skills.",
      "Organized and led Celestia, a successful event that attracted over 200 participants, featuring technical and non-technical challenges, marking the first major event in the history of the Unicode club.",
    ],
  },
  {
    role: "Coding Team",
    company: "DJS Robocon",
    period: "April 2022 - September 2023",
    image: "https://images.pexels.com/photos/6298579/pexels-photo-6298579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    bullets: [
      "Programmed robot movements and throwing mechanisms using Arduino microcontrollers, servo motors, and motor drivers for a national robotics competition, collaborating closely with team members.",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    id: "findr",
    name: "FINDR",
    tagline: "Food Industry Network for Digital Recommendations",
    description:
      "A digital platform offering recommendation-driven solutions for food industry machinery. Built as a team, it accepts user inputs and returns recommendations using content-based filtering.",
    highlights: [
      "Collaborated in a team to build a web application that accepts user inputs and provides valuable recommendations using a content-based filtering algorithm.",
      "Generated accurate recommendations using TF-IDF vectorization along with cosine similarity on collected data.",
      "Implemented integration using Flask REST APIs for smooth backend-frontend communication.",
      "Utilized the useContext hook in React to manage state and store machines for user-side comparison.",
      "Incorporates a customized Groq chatbot to enhance user interaction and assistance.",
    ],
    tech: ["React", "Flask", "REST APIs", "TF-IDF", "Cosine Similarity", "Groq"],
    github: "#",
    live: "#",
  },
  {
    id: "chatwebapp",
    name: "ChatWebApp",
    tagline: "Seamless multimedia communication using MERN, Socket.IO, and Cloudinary",
    description:
      "A real-time multimedia chat application with a well-designed frontend, scalable backend routing and secure JWT-based authentication.",
    highlights: [
      "Adopted daisyUI themes, Lucide-React components, and reusable JSX components while managing state with Zustand to build an efficient, well-designed frontend experience.",
      "Designed efficient backend routing and developed core controllers to ensure scalable and maintainable architecture.",
      "Optimized authentication using JWT to ensure secure user access and enhance data protection.",
      "Integrated Cloudinary for profile picture uploads and implemented online user status tracking using Socket.IO.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "Zustand", "Cloudinary", "JWT"],
    github: "#",
    live: "#",
  },
  {
    id: "chronosense",
    name: "ChronoSense",
    tagline: "Time series analysis and QA combining classical forecasting and RAG workflows",
    description:
      "A project that combines classical forecasting and retrieval-augmented generation workflows to produce insights from temporal data.",
    highlights: [
      "Designed and evaluated time series forecasting models (e.g., LSTM, SARIMA) for pattern prediction and quality assurance analysis.",
      "Built a retrieval-augmented pipeline using vector storage and contextual retrieval over time series data.",
      "Packaged analysis logic into Python scripts and notebook workflows to support reproducible experimentation and insights.",
    ],
    tech: ["Python", "LSTM", "SARIMA", "RAG", "Vector Storage"],
    github: "#",
    live: "#",
  },
  {
    id: "code-editor",
    name: "Code Editor",
    tagline: "Code playground for HTML, CSS and JS",
    description:
      "A responsive, real-time code playground for writing HTML, CSS and JavaScript side by side, with changes saved across sessions.",
    highlights: [
      "Engineered a responsive, real-time code editor using CodeMirror and lucide-react icons, delivering a sleek and performant user interface.",
      "Implemented persistent local storage functionality with a custom React hook, ensuring seamless user experience across sessions.",
      "Employed Vite for fast development and optimized build processes, enhancing overall application performance.",
      "Utilized React's useState and useEffect hooks to manage state and side effects, maintaining a clean and maintainable codebase.",
    ],
    tech: ["React", "Vite", "CodeMirror", "Local Storage"],
    github: "#",
    live: "#",
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["Java", "Python", "JavaScript", "C"] },
  { title: "Frameworks", items: ["React.js", "Vite.js", "Node.js", "Express.js", "Flask"] },
  { title: "Databases", items: ["MySQL", "MongoDB", "Neo4j"] },
  {
    title: "Libraries",
    items: ["Axios", "React Router", "Tailwind CSS", "Mongoose", "bcrypt.js", "jsonwebtoken", "NumPy", "pandas"],
  },
];

export const softSkills = ["Communication", "Team Work", "Problem Solving"];

export const education = [
  {
    school: "DJ Sanghvi College of Engineering",
    degree: "BTech in Artificial Intelligence & Data Science",
    period: "2022 - Present",
    score: "CGPA: 9.2",
    courses: [
      "Operating Systems",
      "Data Structures",
      "Analysis of Algorithms",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Networks",
      "DBMS",
      "Formal Language and Automata Theory",
      "Big Data Infrastructure",
    ],
  },
  {
    school: "Prakash College",
    degree: "HSC Board",
    period: "2022",
    score: "Percentage: 71",
    courses: [],
  },
  {
    school: "C.N.M. School",
    degree: "ICSE Board",
    period: "2020",
    score: "Percentage: 96.4",
    courses: [],
  },
];

export const certifications = [
  { title: "Machine Learning Specialization", issuer: "DeepLearning.AI" },
  { title: "CyberSecurity Virtual Internship", issuer: "Palo Alto Networks (AICTE)" },
  { title: "Google Cybersecurity Professional Certificate V2", issuer: "Coursera" },
  { title: "Generative AI Virtual Internship", issuer: "Google Cloud (AICTE)" },
  { title: "Google Cloud Computing Foundations", issuer: "Google Cloud" },
];

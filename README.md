# 📄 ResumeIQ – AI Resume Analyzer  

> An AI-powered web application that helps job seekers analyze, score, and optimize their resumes for **ATS (Applicant Tracking Systems)** and job descriptions.  
> Built with **React Router v7**, **TailwindCSS v4**, **Zustand**, and **PuterJS**, with support for **PDF parsing and visualization**.  

---

## ✨ Features  
- 📑 **Resume Upload** – Upload PDF resumes seamlessly (via drag & drop).  
- 🔍 **AI-Powered Analysis** – Get insights on structure, clarity, and keyword usage.  
- 🎯 **ATS Compatibility Score** – Visual gauges and charts showing resume strength.  
- 💡 **Smart Suggestions** – Recommendations to optimize resumes for job postings.  
- 🔐 **Authentication** – Simple login flow for managing user resumes.  


## 🛠 Tech Stack  
- **Frontend Framework**: React 19 + React Router v7  
- **Styling**: TailwindCSS v4
- **State Management**: Zustand  
- **File Handling**: PDF.js, react-dropzone  
- **Storage & AI & Auth**: PuterJS
- **Build Tools**: Vite 6 + TypeScript 5  


## 📂 Project Structure  

```bash
resumeiq/
├── app/ # Core app logic
│ ├── components/ # UI components
│ ├── lib/ # Utilities
│ ├── routes/ # Pages (auth, home, upload, resume)
│ ├── root.tsx # Main entry
│ └── routes.ts # Router config
├── constants/ # Shared constants
├── public/ # Static assets 
├── types/ # Custom type definitions
├── Dockerfile # Container setup
├── react-router.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ⚡ Getting Started

### Prerequisites  
- Node.js **>=18**  
- Yarn / npm / pnpm  

### Installation  
```bash
# Clone the repo
git clone https://github.com/yourusername/resumeiq.git
cd resumeiq

# Install dependencies
npm install   # or yarn install

# Run locally
npm run dev   # or yarn dev
````

### Build for Production
```bash
npm run build
npm start
```



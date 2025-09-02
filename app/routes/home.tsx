import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/resume-card";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-10">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your resume and get instant AI-powered feedback!</h2>
        </div>

      {
        resumes.length > 0 && (
          <div className="resumes-section">
            {
              resumes.map((resume: Resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))
            }
          </div>
        )
      }
      </section>

    </main>
  );
}

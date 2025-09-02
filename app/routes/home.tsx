import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ" },
    { name: "description", content: "Smart feedback for your resume!" },
  ];
}

export default function Home() {
  return <div>Welcome to ResumeIQ</div>;
}

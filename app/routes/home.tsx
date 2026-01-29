import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  // html header meta can be added here
  return [
    { title: "DnD Character Tracker" },
    { name: "description", content: "DnD Character Tracker" },
  ];
}

export default function Home() {
  return (
    <h1>Home</h1>
  )
}

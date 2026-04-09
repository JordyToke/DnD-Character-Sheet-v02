import type { Route } from "./+types/home";
import { Navbar } from "~/components";

export function meta({}: Route.MetaArgs) {
  // html header meta can be added here
  return [
    { title: "DnD Character Tracker" },
    { name: "description", content: "DnD Character Tracker" },
  ];
}

const Home = () => {
  return (
    <>
      <h1>Home Route!</h1>
    </>
  );
};

export default Home;

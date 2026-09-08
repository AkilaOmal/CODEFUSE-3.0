import About from "./components/About";
import CodingBackground from "./components/CodingBackground";
import Guidelines from "./components/Guidelines";
import Hero from "./components/Hero";
import PastWinners from "./components/PastWinners";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";
import { createElement } from "react";

export default function Home() {
  return createElement(
    "main",
    { className: "min-h-screen bg-black text-white relative" },
    createElement(Hero),
    createElement(CodingBackground),
    createElement(About),
    createElement(Roadmap),
    createElement(Guidelines),
    createElement(PastWinners),
    createElement(Team),
  );
}

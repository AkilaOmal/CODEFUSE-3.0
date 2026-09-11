// @ts-nocheck
import About from "./components/About";
import CodingBackground from "./components/CodingBackground";
import Guidelines from "./components/Guidelines";
import Hero from "./components/Hero";
import PastWinners from "./components/PastWinners";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";

export default function Home() {
  return (
    // <main className="min-h-screen bg-black text-white relative">
    //   <Hero />
    //   <CodingBackground />
    //   <About />
    //   <Roadmap />
    //   <Guidelines />
    //   <PastWinners />
    //   <Team />
    // </main>
    <main className="relative min-h-screen bg-[#07010d]">
      <Hero />
      <div className="relative">
      <CodingBackground />
      <About />
      <Roadmap />
      <Guidelines />
      <PastWinners />
      <Team />
      </div>
    </main>
  );
}

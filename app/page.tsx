// @ts-nocheck
import Hero from "./components/Hero";
import dynamic from "next/dynamic";

const CodingBackground = dynamic(() => import("./components/CodingBackground"));
const About = dynamic(() => import("./components/About"));
const Roadmap = dynamic(() => import("./components/Roadmap"));
const Guidelines = dynamic(() => import("./components/Guidelines"));
const PastWinners = dynamic(() => import("./components/PastWinners"));
const Team = dynamic(() => import("./components/Team"));

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

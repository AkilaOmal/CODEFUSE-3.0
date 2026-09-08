import About from "./components/About";
import CodingBackground from "./components/CodingBackground";
import Guidelines from "./components/Guidelines";
import Hero from "./components/Hero";
import PastWinners from "./components/PastWinners";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";
import Akila from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      
      <Hero/>
      <CodingBackground />
      {/* <Hero /> */}
      <About />
      <Roadmap />
      <Guidelines />
      <PastWinners />
      <Team />
      
    </main>
  );
}

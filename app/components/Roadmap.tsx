"use client"

import { Lightbulb, Code, Trophy, Users, TimerOff, Info } from "lucide-react"
import { useEffect, useRef } from "react"

const roadmapData = [
  {
    icon: Users,
    title: "REGISTRATION OPEN",
    description:
      "This competition is exclusively for students of the Faculty of Computing, University of Sri Jayewardenepura. Participants can sign up and form their teams as registration opens for all eligible students ready to embark on this exciting coding journey.",
  },
  {
    icon: TimerOff,
    title: "REGISTRATION CLOSED",
    description:
      "Once the deadline is reached, registration is officially closed. Teams are finalized, and the stage is set.",
  },
  {
    icon: Info,
    title: "AWARENESS SESSION",
    description: "A dedicated session to guide participants through the hackathon process, rules, and expectations—ensuring everyone is prepared and inspired.",
  },
  {
    icon: Code,
    title: "HAKATHON DAY",
    description: "A 9-hour online coding competition hosted on HackerRank. Participants from all three batches solve algorithmic challenges and compete in real-time.",
  },
   {
    icon: Trophy,
    title: "WINNERS ANNOUNCEMENT",
    description: "Top performers from each batch (1st, 2nd, and 3rd year) are recognized. Winners are selected based on problem-solving accuracy, speed, and overall score.",
  },
  
]

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".animate-on-scroll")
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fadeInUp")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-sm font-medium mb-6">ROAD MAP</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            THE JOURNEY OF{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              CODEFUSE 3.0
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line hidden md:block"></div>

          <div className="space-y-12">
            {roadmapData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-12 animate-on-scroll`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center md:text-left`}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-3 text-purple-300">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="relative z-10 my-4 md:my-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center neon-glow">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

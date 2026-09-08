"use client"

import { Check,  AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"

const guidelines = {
  dos: [
    "This Hackothon is only for Faculty of Computing students University of Sri Jayewardenepura.",
    "Competitors can apply as individuals or groups of 3 or less.",
    "The team leader should fill up the form.",
    "The team name should be the team's hackerrank handle (will be informed later).",
  ],
  donts: [
    "Team leader must create one HackerRank account for the whole team.",
    "Go to https://www.hackerrank.com/signup.",
    "Sign up using the email (do not use Google/Facebook/GitHub login).",
    "Go to Settings > Personal Information on HackerRank.",
    "In the “Username” field, change it to your official team name (as registered in CodeFuse).",
    "Save the changes. Your HackerRank account is now ready.",
    "Share the email, username, and password with all team members securely.",
    "Use this shared account to log in when the contest link is provided.",
    "Join the contest using the same account — only one account per team is allowed.",
  ],
}

export default function Guidelines() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".animate-on-scroll")
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                if (index === 0) el.classList.add("animate-fadeInUp")
                else if (index === 1) el.classList.add("animate-fadeInLeft")
                else if (index === 2) el.classList.add("animate-fadeInRight")
                else el.classList.add("animate-fadeInUp")
              }, index * 200)
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
          <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-sm font-medium mb-6">
            GUIDELINES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            HACKATHON{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">RULES</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 animate-on-scroll">
            <div className="flex items-center mb-6">
              <Check className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-bold text-green-400">Registration Guiedlines</h3>
            </div>
            <ul className="space-y-3">
              {guidelines.dos.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 animate-on-scroll">
            <div className="flex items-center mb-6">
              <Check className="w-6 h-6 text-red-400 mr-3" />
              <h3 className="text-xl font-bold text-red-400">Hacker-Rank Guiedlines</h3>
            </div>
            <ul className="space-y-3">
              {guidelines.donts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-red-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <div className="text-center">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-8 inline-block animate-on-scroll">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-yellow-400 font-semibold">Important Notice</span>
            </div>
            <p className="text-gray-300">
              All submissions will be reviewed for originality. Plagiarism will result in immediate disqualification.
            </p>
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 neon-glow hover:scale-105 animate-on-scroll">
            REGISTER NOW
          </button>
        </div> */}
      </div>
    </section>
  )
}

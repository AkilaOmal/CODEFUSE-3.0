"use client"

import Image from "next/image"

import { Linkedin, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const teamMembers = [
  {
    name: "Tharindu Thilakarathna",
    role: "Chair-Person",
    image: "/chair.png?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/tharindu-thilakarathna-4217a6304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/Tharindu-X",
  },
  {
    name: "Saranga Samarakoon",
    role: "Quiz Master",
    image: "/quiz.png?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/saranga-samarakoon-77791427b/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BShkQ6t5QSvaaHIu8zuLwRw%3D%3D",
    github: "https://github.com/AsekaSL",
  },
  {
    name: "Senidu Ravihara",
    role: "Web Master",
    image: "/webmaster.png?height=200&width=200",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Kavishka Venuka",
    role: "Quiz Coordinator",
    image: "/Qassis1.png?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/kavishka-venuka-de-alwis-31140a27b",
    github: "https://github.com/KavishkaVenuka",
  },
  {
    name: "Nimesha Rathnayke",
    role: "Quiz Coordinator",
    image: "/Qassis2.png?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/nimesha-rathnayake-b95471344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Nimesha-Kavindu",
  },
]

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const [glitch, setGlitch] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const router = useRouter();


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".animate-on-scroll")
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fadeInUp")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  const handleRegisterClick = () => {
    //setShowPopup(true)
    //setTimeout(() => setShowPopup(false), 3000)

    router.push('/register');

  }


  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-sm font-medium mb-6">OUR TEAM</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            MEET THE{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              ORGANIZERS
            </span>
          </h2>
        </div>

        {/* First row: 3 team members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div key={index} className="group animate-on-scroll">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 text-center hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative mb-6 overflow-hidden rounded-full mx-auto w-32 h-32">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                <p className="text-purple-300 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.github} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row: 2 team members centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-3xl mx-auto">
          {teamMembers.slice(3).map((member, index) => (
            <div key={index + 3} className="group animate-on-scroll">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 text-center hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative mb-6 overflow-hidden rounded-full mx-auto w-32 h-32">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                <p className="text-purple-300 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.github} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Join CODEFUSE 2.0?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Don't miss out on the ultimate hackathon experience. Register now and be part of the coding revolution!
            </p>
            <button
              onClick={handleRegisterClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 neon-glow hover:scale-105"
            >
              Register Now
            </button>


            {/* Toast-style popup in top-right */}
            {showPopup && (
              <div className="fixed top-6 font-semibold right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-xl  border-purple-300 z-50 animate-fade-in-out">
                🎉 <strong>Registration</strong> opens soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

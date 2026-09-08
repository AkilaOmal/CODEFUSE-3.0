"use client"

import { useEffect, useState } from "react"

const codeSnippets = [
  "Code Fuse 3.0",
  "function hackathon() {","Code Fuse 3.0",
  "const code = 'awesome';",
  "if (innovation) {",
  "return success;",
  "}",
  "console.log('CODEFUSE');",
  "npm install creativity",
  "git commit -m 'magic'",
  "while (coding) {",
  "dream.push(reality);",
  "const future = await build();",
  "export default brilliance;",
  "import { passion } from 'dev';",
  "let ideas = [];",
  "for (let i = 0; i < ∞; i++) {",
  "setTimeout(() => {",
  "process.env.INNOVATION",
  "async function create() {",
  "return Promise.resolve();",
  "} catch (error) {",
  "throw new Error('Epic!');",
  "const hackathon = true;",
  "Array.from(developers)",
  "Object.keys(creativity)",
  "JSON.stringify(dreams)",
  "Math.random() * magic",
  "document.querySelector('.future')",
  "addEventListener('code', hack)",
  "localStorage.setItem('win', true)",
  "fetch('/api/innovation')",
]

const binaryChars = ["0", "1"]
const symbols = [
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  "<",
  ">",
  "/",
  "\\",
  "|",
  "-",
  "_",
  "=",
  "+",
  "*",
  "&",
  "%",
  "$",
  "#",
  "@",
]

interface FallingElement {
  id: number
  content: string
  x: number
  y: number
  speed: number
  opacity: number
  type: "binary" | "code" | "symbol"
  color: string
}

export default function CodingBackground() {
  const [elements, setElements] = useState<FallingElement[]>([])

  useEffect(() => {
    const createFallingElement = (id: number): FallingElement => {
      const types: ("binary" | "code" | "symbol")[] = ["binary", "code", "symbol"]
      const type = types[Math.floor(Math.random() * types.length)]

      let content = ""
      let color = ""

      switch (type) {
        case "binary":
          content = Array.from(
            { length: Math.floor(Math.random() * 8) + 3 },
            () => binaryChars[Math.floor(Math.random() * binaryChars.length)],
          ).join("")
          color = Math.random() > 0.7 ? "#a855f7" : "#ec4899"
          break
        case "code":
          content = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          color = Math.random() > 0.5 ? "#8b5cf6" : "#d946ef"
          break
        case "symbol":
          content = symbols[Math.floor(Math.random() * symbols.length)]
          color = Math.random() > 0.6 ? "#c084fc" : "#f472b6"
          break
      }

      return {
        id,
        content,
        x: Math.random() * window.innerWidth,
        y: -50,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        type,
        color,
      }
    }

    let elementId = 0
    const maxElements = 50

    // Initialize elements
    const initialElements: FallingElement[] = []
    for (let i = 0; i < maxElements; i++) {
      const element = createFallingElement(elementId++)
      element.y = Math.random() * window.innerHeight
      initialElements.push(element)
    }
    setElements(initialElements)

    const animationFrame = () => {
      setElements((prevElements) => {
        const updatedElements = prevElements
          .map((element) => ({
            ...element,
            y: element.y + element.speed,
            opacity: element.y > window.innerHeight * 0.8 ? element.opacity * 0.98 : element.opacity,
          }))
          .filter((element) => element.y < window.innerHeight + 100)

        // Add new elements
        while (updatedElements.length < maxElements) {
          updatedElements.push(createFallingElement(elementId++))
        }

        return updatedElements
      })
    }

    const interval = setInterval(animationFrame, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Matrix-style grid overlay */}
      <div className="absolute inset-0 opacity-2">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Falling code elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute font-mono text-xs whitespace-nowrap select-none"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            color: element.color,
            opacity: element.opacity,
            fontSize: element.type === "code" ? "10px" : element.type === "binary" ? "12px" : "14px",
            textShadow: `0 0 10px ${element.color}40`,
            transform: element.type === "symbol" ? `rotate(${Math.sin(element.y * 0.01) * 10}deg)` : "none",
          }}
        >
          {element.content}
        </div>
      ))}

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Animated circuit paths */}
        <path
          d="M0,100 Q200,50 400,100 T800,100 L800,200 Q600,150 400,200 T0,200 Z"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          className="animate-pulse"
        />
        <path
          d="M0,300 Q300,250 600,300 T1200,300 L1200,400 Q900,350 600,400 T0,400 Z"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <path
          d="M0,500 Q150,450 300,500 T600,500 L600,600 Q450,550 300,600 T0,600 Z"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </svg>

      {/* Glowing orbs that move */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full blur-sm animate-ping opacity-20"></div>
      <div
        className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-500 rounded-full blur-sm animate-ping opacity-15"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full blur-sm animate-ping opacity-20"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute top-1/6 right-1/3 w-1 h-1 bg-pink-400 rounded-full blur-sm animate-ping opacity-10"
        style={{ animationDelay: "2.5s" }}
      ></div>
    </div>
  )
}

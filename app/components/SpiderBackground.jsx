"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import "./SpiderBackground.css";

const violet = { core: "#d8b4fe", bright: "#a855f7" };

function createNetwork(width, height) {
  const radius = Math.min(width, height) * 0.24;
  const inset = Math.min(width, height) * 0.045;
  const corners = [
    { x: inset, y: inset, direction: 1 },
    { x: width - inset, y: inset, direction: -1 },
    { x: inset, y: height - inset, direction: 1 },
    { x: width - inset, y: height - inset, direction: -1 },
  ];
  return {
    corners: corners.map((corner, cornerIndex) => {
      const nodes = [{ x: corner.x, y: corner.y, pulse: cornerIndex }];
      const lines = [];
      for (let ring = 1; ring <= 4; ring += 1) {
        const ringRadius = radius * ring / 4;
        for (let spoke = 0; spoke < 8; spoke += 1) {
          const angle = (spoke / 8) * Math.PI * 2;
          nodes.push({
            x: corner.x + Math.cos(angle) * ringRadius * corner.direction,
            y: corner.y + Math.sin(angle) * ringRadius,
            pulse: cornerIndex + ring + spoke * 0.4,
          });
        }
      }
      for (let spoke = 0; spoke < 8; spoke += 1) {
        for (let ring = 0; ring < 4; ring += 1) {
          const current = ring === 0 ? 0 : 1 + (ring - 1) * 8 + spoke;
          const next = 1 + ring * 8 + spoke;
          lines.push([current, next]);
          if (ring > 0) lines.push([next, 1 + ring * 8 + ((spoke + 1) % 8)]);
        }
      }
      return { ...corner, nodes, lines, radius };
    }),
    radius,
  };
}

function drawMechanicalSpider(context, spider) {
  const { x, y, scale, rotation, alpha } = spider;
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.scale(scale, scale);
  context.globalAlpha = alpha;
  context.lineWidth = 1;
  context.strokeStyle = "rgba(192, 132, 252, 0.78)";
  context.fillStyle = "rgba(12, 4, 24, 0.96)";
  context.shadowColor = "rgba(168, 85, 247, 0.65)";
  context.shadowBlur = 4;

  context.beginPath();
  context.moveTo(-5, -3);
  context.lineTo(0, -6);
  context.lineTo(6, -3);
  context.lineTo(4, 4);
  context.lineTo(0, 7);
  context.lineTo(-5, 4);
  context.closePath();
  context.fill();
  context.stroke();

  context.beginPath();
  context.arc(0, -8, 2.8, 0, Math.PI * 2);
  context.fillStyle = "rgba(37, 10, 61, 0.98)";
  context.fill();
  context.stroke();

  context.strokeStyle = violet.bright;
  context.fillStyle = violet.core;
  context.shadowBlur = 3;
  context.beginPath();
  context.arc(0, 0, 1.8, 0, Math.PI * 2);
  context.fill();

  for (let side = -1; side <= 1; side += 2) {
    for (let leg = 0; leg < 4; leg += 1) {
      const yOffset = (leg - 1.5) * 3;
      context.beginPath();
      context.moveTo(side * 3, yOffset);
      context.lineTo(side * 7, yOffset + (leg % 2 ? side * 2 : -side * 2));
      context.lineTo(side * 11, yOffset + (leg - 1.5) * 2);
      context.stroke();
      context.beginPath();
      context.arc(side * 11, yOffset + (leg - 1.5) * 2, 0.8, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.restore();
}

export default function SpiderBackground() {
  const pathname = usePathname();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const intensity = pathname === "/register" ? 0.58 : 1;
    const spiderCount = isMobile ? 4 : 8;
    const particleCount = isMobile ? 10 : 18;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let network = { nodes: [], lines: [], edge: 0 };
    let particles = [];
    let spiders = [];

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      network = createNetwork(width, height);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const resetScene = () => {
      gsap.killTweensOf(spiders);
      particles = Array.from({ length: particleCount }, (_, index) => {
        const edgeParticle = index % 2 === 0;
        return {
          x: edgeParticle ? (index % 4 === 0 ? Math.random() * width * 0.22 : width * 0.78 + Math.random() * width * 0.22) : Math.random() * width,
          y: edgeParticle ? Math.random() * height : (index % 3 === 0 ? Math.random() * height * 0.2 : height * 0.8 + Math.random() * height * 0.2),
          drift: Math.random() * Math.PI * 2,
          size: 0.5 + Math.random() * 1.1,
          alpha: (0.08 + Math.random() * 0.12) * intensity,
          speed: 0.1 + Math.random() * 0.24,
          offset: index * 0.45,
        };
      });
      spiders = Array.from({ length: spiderCount }, (_, index) => {
        const corner = network.corners[Math.floor(index / 2) % 4];
        const angle = (index % 2 ? 0.28 : 1.35) + Math.random() * 0.55;
        const distance = corner.radius * (0.35 + Math.random() * 0.45);
        const x = corner.x + Math.cos(angle) * distance * corner.direction;
        const y = corner.y + Math.sin(angle) * distance;
        const targetAngle = angle + (index % 2 ? 0.9 : -0.8);
        const targetDistance = corner.radius * (0.55 + Math.random() * 0.3);
        const targetX = corner.x + Math.cos(targetAngle) * targetDistance * corner.direction;
        const targetY = corner.y + Math.sin(targetAngle) * targetDistance;
        const state = { x, y, targetX, targetY, scale: 0.9 + Math.random() * 0.35, rotation: targetAngle + (corner.direction < 0 ? Math.PI : 0), alpha: (0.42 + Math.random() * 0.22) * intensity };
        if (!reducedMotion) {
          gsap.timeline({ repeat: -1, delay: Math.random() * 7, yoyo: true })
            .to(state, { x: targetX, y: targetY, rotation: targetAngle + (corner.direction < 0 ? Math.PI : 0), duration: 18 + Math.random() * 12, ease: "sine.inOut" })
            .to(state, { x: corner.x + Math.cos(angle) * distance * corner.direction, y: corner.y + Math.sin(angle) * distance, rotation: angle + (corner.direction < 0 ? Math.PI : 0), duration: 16 + Math.random() * 12, ease: "sine.inOut" });
        }
        return state;
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const now = performance.now() * 0.001;
      network.corners.forEach((corner) => {
        context.lineWidth = 0.65;
        context.strokeStyle = `rgba(168, 85, 247, ${0.2 * intensity})`;
        corner.lines.forEach(([from, to]) => {
          context.beginPath();
          context.moveTo(corner.nodes[from].x, corner.nodes[from].y);
          context.lineTo(corner.nodes[to].x, corner.nodes[to].y);
          context.stroke();
        });
        corner.nodes.forEach((node) => {
          const pulse = 0.7 + Math.sin(now * 0.7 + node.pulse) * 0.35;
          context.fillStyle = `rgba(216, 180, 254, ${0.36 * intensity})`;
          context.shadowColor = "rgba(217, 70, 239, 0.8)";
          context.shadowBlur = 4;
          context.beginPath();
          context.arc(node.x, node.y, pulse, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
        });
      });
      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.y -= particle.speed;
          particle.x += Math.sin(now * 0.25 + particle.drift) * 0.08;
          if (particle.y < -4) particle.y = height + 4;
        }
        context.fillStyle = `rgba(192, 132, 252, ${particle.alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      spiders.forEach((spider) => drawMechanicalSpider(context, spider));
    };

    setSize();
    resetScene();
    gsap.ticker.add(draw);
    window.addEventListener("resize", setSize);
    window.addEventListener("resize", resetScene);

    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("resize", resetScene);
      gsap.killTweensOf(spiders);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="spider-background" aria-hidden="true" />;
}

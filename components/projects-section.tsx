"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, Folder, Code2 } from "lucide-react"
import SectionWrapper from "./section-wrapper"

interface Project {
  type: "freelancer" | "personal"
  title: string
  role: string
  description: string[]
  tags: string[]
  date: string
  color: string
}

const projects: Project[] = [
  {
    type: "personal",
    title: "CloudShell Lab",
    role: "Developer & Project Manager",
    description: [
      "Designed a cloud-native learning platform using Docker and Kubernetes to provision on-demand browser-based cloud shells",
      "Reduced manual setup time by 90% through automated container orchestration",
    ],
    tags: ["Docker", "Kubernetes", "Cloud-Native", "DevOps"],
    date: "2025",
    color: "#3B82F6",
  },
  {
    type: "personal",
    title: "Job Search Assistant",
    role: "AI / Full-Stack Developer",
    description: [
      "Designed and deployed an AI-powered career development web app using Flask, Bootstrap, and Gemini API",
      "Enables resume analysis, ATS optimization, interview question generation, and personalized job search guidance through real-time intelligent chat",
    ],
    tags: ["Flask", "Gemini AI", "Bootstrap", "Python", "NLP"],
    date: "2025",
    color: "#8B5CF6",
  },
  {
    type: "personal",
    title: "Complete CI/CD Pipeline",
    role: "DevOps Engineer",
    description: [
      "Automated an end-to-end CI/CD pipeline using Git, Jenkins, SonarQube, Docker, Kubernetes, and Argo CD",
      "Enabled continuous integration and cloud deployment for full-stack applications",
    ],
    tags: ["Jenkins", "SonarQube", "Docker", "Kubernetes", "Argo CD", "Git"],
    date: "2025",
    color: "#FF9900",
  },
  {
    type: "personal",
    title: "AWG Water Generator",
    role: "IoT Developer",
    description: [
      "Engineered an IoT-based atmospheric water generator using a Peltier system producing 1–2 liters/day",
      "Implemented live sensor monitoring and predictive performance analytics",
    ],
    tags: ["IoT", "Sensors", "Peltier System", "Analytics", "Embedded"],
    date: "2024",
    color: "#22C55E",
  },
  {
    type: "personal",
    title: "Edge–Cloud Server",
    role: "Cloud & DevOps Engineer",
    description: [
      "Built and deployed a full-stack edge–cloud server using Raspberry Pi as an edge host",
      "Containerized backend with Docker for seamless cloud integration and deployment",
    ],
    tags: ["Raspberry Pi", "Docker", "Edge Computing", "Cloud", "Node.js"],
    date: "Dec 2025 – Jan 2026",
    color: "#F43F5E",
  },
]

function TimelineCard({ project, index, isLeft }: { project: Project; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full mb-10 lg:mb-16 ${isLeft ? '' : 'lg:flex-row-reverse'
        }`}
    >
      {/* Mobile date badge - shows above card on mobile */}
      <div
        className="lg:hidden mb-3 inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold"
        style={{
          borderColor: `${project.color}40`,
          backgroundColor: `${project.color}10`,
          color: project.color,
        }}
      >
        {project.date}
      </div>

      {/* Card */}
      <div
        className={`w-full lg:w-[calc(50%-40px)] transition-all duration-700 ${isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${isLeft ? '-translate-x-12' : 'translate-x-12'}`
          }`}

        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? `0 20px 60px -15px ${project.color}30, 0 0 0 1px ${project.color}30`
              : '0 4px 20px -10px rgba(0,0,0,0.3)',
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              opacity: isHovered ? 1 : 0.5,
            }}
          />

          {/* Spotlight effect */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              background: `radial-gradient(circle at ${isLeft ? '80%' : '20%'} 0%, ${project.color}10 0%, transparent 50%)`,
            }}
          />

          <div className="p-6 lg:p-8">
            {/* Header with icon and title */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: `${project.color}15`,
                  border: `1px solid ${project.color}30`,
                  transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                }}
              >
                <span className="text-xl font-bold" style={{ color: project.color }}>
                  {project.title.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-sm font-semibold" style={{ color: project.color }}>
                  {project.role}
                </p>
              </div>
            </div>

            {/* Description */}
            <ul className="space-y-2 mb-5">
              {project.description.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                  style={{
                    transitionDelay: `${i * 50}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.5s ease-out',
                  }}
                >
                  <span className="text-primary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-300"
                  style={{
                    borderColor: `${project.color}30`,
                    backgroundColor: `${project.color}08`,
                    color: project.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/30">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={16} />
                <span>Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline connector - Center circle with icon */}
      <div
        className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        style={{ transitionDelay: `${index * 100 + 200}ms` }}
      >
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            backgroundColor: isHovered ? project.color : 'hsl(var(--card))',
            border: `2px solid ${project.color}`,
            boxShadow: isHovered
              ? `0 0 30px ${project.color}50, 0 0 60px ${project.color}30`
              : `0 0 20px ${project.color}30`,
          }}
        >
          <Code2
            size={22}
            className="transition-colors duration-300"
            style={{ color: isHovered ? 'white' : project.color }}
          />
        </div>
      </div>

      {/* Date badge - Opposite side */}
      <div
        className={`hidden lg:flex w-[calc(50%-40px)] ${isLeft ? 'justify-start pl-16' : 'justify-end pr-16'
          } transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? 'translate-x-12' : '-translate-x-12'}`
          }`}
        style={{ transitionDelay: `${index * 100 + 100}ms` }}
      >
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300"
          style={{
            borderColor: `${project.color}40`,
            backgroundColor: `${project.color}10`,
          }}
        >
          <span className="text-sm font-semibold" style={{ color: project.color }}>
            {project.date}
          </span>
        </div>
      </div>
    </div>
  )
}


export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-semibold tracking-wide">Featured Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A timeline of my <span className="text-primary font-semibold">Journey</span> building{" "}
            <span className="text-primary font-semibold">Impactful Solutions</span>
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Central timeline line */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.3), transparent)',
            }}
          />

          {/* Glowing line effect */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 10%, hsl(var(--primary) / 0.1) 30%, hsl(var(--primary) / 0.1) 70%, transparent 90%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Timeline cards */}
          <div className="relative pt-8 lg:pt-0">
            {projects.map((project, i) => (
              <TimelineCard
                key={project.title}
                project={project}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* View All Projects button */}
        <div
          className={`flex justify-center mt-16 transition-all duration-1000 delay-500 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <span className="text-foreground font-semibold">View All Projects</span>
            <Folder size={18} className="text-primary group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}

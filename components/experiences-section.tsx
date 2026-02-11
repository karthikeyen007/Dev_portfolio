"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Code2, Building2 } from "lucide-react"
import SectionWrapper from "./section-wrapper"

interface Experience {
  company: string
  type: string
  role: string
  duration?: string
  highlights: string[]
  skills: string[]
  period: string
  iconColor: string
  accentHsl: string
}

const experiences: Experience[] = [
  {
    company: "Euron",
    type: "Internship",
    role: "Data Science & ML Intern",
    highlights: [
      "Developed scalable AI workflow applications using Python, Streamlit, and RAG pipelines",
      "Integrated vector databases, Generative AI models, and REST APIs into production systems",
      "Improved system performance and response efficiency by ~40% through optimized pipelines",
    ],
    skills: ["Python", "Streamlit", "RAG Pipelines", "Generative AI", "REST APIs"],
    period: "Jul 2025 – Present",
    iconColor: "from-violet-500 to-purple-600",
    accentHsl: "270 70% 55%",
  },
  {
    company: "Cognifyz Technologies",
    type: "Internship",
    role: "Web Development Intern",
    duration: "2 months",
    highlights: [
      "Developed and deployed responsive web applications with admin dashboards and workflow features",
      "Collaborated across teams to deliver scalable solutions serving 100+ users",
      "Earned a performance-based stipend for exceptional delivery and code quality",
    ],
    skills: ["HTML/CSS", "JavaScript", "Responsive Design", "Dashboards", "Team Collaboration"],
    period: "Dec 2024 – Jan 2025",
    iconColor: "from-blue-500 to-cyan-500",
    accentHsl: "200 80% 55%",
  },
  {
    company: "VM Polymers",
    type: "Freelance",
    role: "Freelance Web Developer",
    duration: "3 months",
    highlights: [
      "Deployed a production-ready booking platform with secure payment integration",
      "Built database-backed persistence, analytics tracking, and cloud hosting infrastructure",
      "Awarded a project prize for delivering a complete, market-ready solution",
    ],
    skills: ["Full Stack", "Payment Integration", "Cloud Hosting", "Analytics", "Database Design"],
    period: "Sep 2025 – Nov 2025",
    iconColor: "from-emerald-500 to-teal-500",
    accentHsl: "160 70% 45%",
  },
]

function TimelineCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const icons = [Briefcase, Code2, Building2]
  const Icon = icons[index % icons.length]
  const isEven = index % 2 === 0

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
      className={`relative flex items-center gap-8 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline connector dot - visible on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${isHovered
            ? "border-primary bg-primary scale-125 shadow-lg shadow-primary/50"
            : "border-primary/50 bg-background"
            }`}
        />
      </div>

      {/* Card - alternating sides on desktop, full width on mobile */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
          }`}
      >
        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle glow */}
          <div
            className={`absolute -inset-0.5 rounded-2xl blur-lg transition-opacity duration-500 ${isHovered ? "opacity-30" : "opacity-0"
              }`}
            style={{
              background: `linear-gradient(135deg, hsl(${exp.accentHsl}) 0%, hsl(var(--primary)) 100%)`,
            }}
          />

          {/* Card body */}
          <div
            className={`relative bg-card/90 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-400 ${isHovered
              ? "border-primary/40 shadow-xl -translate-y-1"
              : "border-border/30 shadow-md"
              }`}
          >
            {/* Accent top line */}
            <div
              className="h-[2px]"
              style={{
                background: `linear-gradient(90deg, hsl(${exp.accentHsl}), hsl(var(--primary)), transparent)`,
              }}
            />

            <div className="p-5">
              {/* Header row */}
              <div className="flex items-center gap-3 mb-3">
                {/* Compact icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.iconColor} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isHovered ? "scale-110 shadow-lg" : ""
                    }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 8px 20px -6px hsl(${exp.accentHsl} / 0.5)`
                      : "none",
                  }}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground truncate">
                      {exp.company}
                    </h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-md bg-primary/10 text-primary border border-primary/20">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm text-primary/80 font-semibold">{exp.role}</p>
                </div>

                {/* Period badge - right aligned */}
                <div className="hidden sm:block text-right flex-shrink-0">
                  <span className="text-xs text-muted-foreground font-semibold">
                    {exp.period}
                  </span>
                  {exp.duration && (
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                      {exp.duration}
                    </p>
                  )}
                </div>
              </div>

              {/* Period on mobile */}
              <div className="sm:hidden mb-3">
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>

              {/* Highlights - compact */}
              <div className="space-y-1.5 mb-3">
                {exp.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 transition-all duration-500 ${isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                      }`}
                    style={{ transitionDelay: `${index * 200 + 300 + i * 80}ms` }}
                  >
                    <div
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: `hsl(${exp.accentHsl})` }}
                    />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills row */}
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md border transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      } bg-primary/5 text-primary/80 border-primary/15 group-hover:bg-primary/10 group-hover:border-primary/30`}
                    style={{ transitionDelay: `${index * 200 + 500 + i * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExperiencesSection() {
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
    <SectionWrapper id="experiences">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-semibold">Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Experience
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Impactful roles building{" "}
            <span className="text-primary font-semibold">scalable</span> and{" "}
            <span className="text-primary font-semibold">innovative</span> solutions
          </p>
        </div>

        {/* Timeline spine - visible on md+ */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          {/* Experience cards */}
          <div className="space-y-10 md:space-y-14">
            {experiences.map((exp, i) => (
              <TimelineCard
                key={`${exp.company}-${exp.role}`}
                exp={exp}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import SectionWrapper from "./section-wrapper"

interface Certification {
  title: string
  issuer: string
  date: string
  tags: string[]
  color: string
  gradient: string
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "Jan 2025",
    tags: ["AWS", "Cloud Architecture"],
    color: "#FF9900",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "Dec 2024",
    tags: ["Kubernetes", "DevOps"],
    color: "#326CE5",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Nov 2024",
    tags: ["TensorFlow", "Machine Learning"],
    color: "#FF6F00",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Azure Data Engineer Associate",
    issuer: "Microsoft",
    date: "Oct 2024",
    tags: ["Azure", "Data Engineering"],
    color: "#0089D6",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Certified Mid-Level Vue.js Developer",
    issuer: "Certificates.dev",
    date: "Aug 2024",
    tags: ["Vue 3", "Frontend"],
    color: "#42B883",
    gradient: "from-emerald-500 to-teal-500",
  },
]

function CertificationCard({
  cert,
  isActive,
  offset
}: {
  cert: Certification
  isActive: boolean
  offset: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="absolute top-0 left-1/2 w-full max-w-[450px] transition-all duration-700 ease-out"
      style={{
        transform: `translateX(calc(-50% + ${offset * 120}%)) scale(${isActive ? 1 : 0.85}) rotateY(${offset * -15}deg)`,
        opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
        perspective: '1000px',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative bg-card rounded-3xl border overflow-hidden
          transition-all duration-500
          ${isActive ? 'border-primary/30 shadow-2xl' : 'border-border/20 shadow-lg'}
        `}
        style={{
          transform: isHovered && isActive ? 'translateZ(20px) scale(1.02)' : 'translateZ(0) scale(1)',
          boxShadow: isActive
            ? `0 30px 60px -15px ${cert.color}30, 0 0 0 1px ${cert.color}10`
            : '0 10px 30px -10px rgba(0,0,0,0.2)',
        }}
      >
        {/* Spotlight effect */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered && isActive ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${cert.color}15 0%, transparent 50%)`,
          }}
        />

        {/* Top gradient bar */}
        <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

        <div className="p-8">
          <div className="flex items-start gap-5">
            {/* Award icon with 3D effect */}
            <div
              className={`
                relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.gradient} 
                flex items-center justify-center flex-shrink-0
                transition-all duration-500
              `}
              style={{
                transform: isHovered && isActive ? 'translateZ(30px) rotate(-5deg)' : 'translateZ(0) rotate(0deg)',
                boxShadow: isActive
                  ? `0 15px 30px -10px ${cert.color}50`
                  : '0 5px 15px -5px rgba(0,0,0,0.2)',
              }}
            >
              <Award size={28} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-muted-foreground font-semibold mb-1">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground/70 mb-4">{cert.date}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300"
                    style={{
                      borderColor: `${cert.color}30`,
                      backgroundColor: `${cert.color}10`,
                      color: cert.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* View certificate link */}
          <div className="mt-6 pt-4 border-t border-border/20">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
            >
              View Certificate
              <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertificationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const totalCerts = certifications.length

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCerts)
  }, [totalCerts])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCerts) % totalCerts)
  }, [totalCerts])

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(goToNext, 4000)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, goToNext])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <SectionWrapper id="certifications">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-semibold">Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milestones that validate my dedication to{" "}
            <span className="text-primary font-semibold">learning</span>,{" "}
            <span className="text-primary font-semibold">growth</span>, and{" "}
            <span className="text-primary font-semibold">excellence</span>
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative h-[350px] md:h-[320px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1200px' }}
        >
          {/* Cards */}
          <div className="relative h-full">
            {certifications.map((cert, index) => {
              const offset = index - currentIndex
              // Handle wrap-around
              const adjustedOffset = offset > totalCerts / 2
                ? offset - totalCerts
                : offset < -totalCerts / 2
                  ? offset + totalCerts
                  : offset

              return (
                <CertificationCard
                  key={cert.title}
                  cert={cert}
                  isActive={index === currentIndex}
                  offset={adjustedOffset}
                />
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 
              w-12 h-12 md:w-14 md:h-14 
              rounded-full bg-card/90 backdrop-blur-sm
              border border-border/50 hover:border-primary/50
              flex items-center justify-center
              text-muted-foreground hover:text-primary
              transition-all duration-300
              hover:scale-110 hover:shadow-xl hover:shadow-primary/20
              focus:outline-none focus:ring-2 focus:ring-primary/50
              group"
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 
              w-12 h-12 md:w-14 md:h-14 
              rounded-full bg-card/90 backdrop-blur-sm
              border border-border/50 hover:border-primary/50
              flex items-center justify-center
              text-muted-foreground hover:text-primary
              transition-all duration-300
              hover:scale-110 hover:shadow-xl hover:shadow-primary/20
              focus:outline-none focus:ring-2 focus:ring-primary/50
              group"
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {certifications.map((cert, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative p-1 focus:outline-none"
              aria-label={`Go to ${cert.title}`}
            >
              <div
                className={`
                  h-2 rounded-full transition-all duration-500
                  ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'}
                `}
              />
              {/* Tooltip on hover */}
              <div
                className={`
                  absolute -top-10 left-1/2 -translate-x-1/2 
                  px-3 py-1 bg-card/95 backdrop-blur-sm border border-border/50 
                  rounded-lg text-xs font-bold text-foreground
                  whitespace-nowrap opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none
                `}
              >
                {cert.title.split(' ').slice(0, 2).join(' ')}
              </div>
            </button>
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
            {isAutoPlaying ? 'Auto-sliding' : 'Paused'}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Github, Linkedin, Twitter, ArrowDown, Sparkles } from "lucide-react"

const techStack = [
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "AWS", icon: "/img/aws-logo.svg" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
]

const softSkills = [
  "Machine Learning",
  "Cloud Architecture",
  "DevOps",
  "Data Engineering",
  "Problem-solving",
  "Innovation",
]

// Star particles for cosmic effect - pre-computed to avoid hydration mismatch
const stars = [
  { id: 0, size: 1.5, x: 5, y: 10, delay: 0, duration: 3 },
  { id: 1, size: 2, x: 15, y: 25, delay: 0.5, duration: 2.5 },
  { id: 2, size: 1.2, x: 25, y: 8, delay: 1, duration: 4 },
  { id: 3, size: 2.5, x: 35, y: 45, delay: 1.5, duration: 3.5 },
  { id: 4, size: 1.8, x: 45, y: 15, delay: 2, duration: 2.8 },
  { id: 5, size: 1.3, x: 55, y: 35, delay: 0.3, duration: 4.2 },
  { id: 6, size: 2.2, x: 65, y: 5, delay: 0.8, duration: 3.2 },
  { id: 7, size: 1.6, x: 75, y: 55, delay: 1.2, duration: 2.6 },
  { id: 8, size: 2.8, x: 85, y: 20, delay: 1.8, duration: 3.8 },
  { id: 9, size: 1.4, x: 95, y: 40, delay: 2.2, duration: 2.2 },
  { id: 10, size: 1.7, x: 10, y: 60, delay: 0.2, duration: 4.5 },
  { id: 11, size: 2.1, x: 20, y: 75, delay: 0.7, duration: 3.3 },
  { id: 12, size: 1.1, x: 30, y: 85, delay: 1.3, duration: 2.9 },
  { id: 13, size: 2.4, x: 40, y: 70, delay: 1.7, duration: 3.7 },
  { id: 14, size: 1.9, x: 50, y: 90, delay: 2.1, duration: 2.4 },
  { id: 15, size: 1.5, x: 60, y: 65, delay: 0.4, duration: 4.1 },
  { id: 16, size: 2.6, x: 70, y: 80, delay: 0.9, duration: 3.1 },
  { id: 17, size: 1.3, x: 80, y: 50, delay: 1.4, duration: 2.7 },
  { id: 18, size: 2.0, x: 90, y: 95, delay: 1.9, duration: 3.9 },
  { id: 19, size: 1.8, x: 98, y: 72, delay: 2.4, duration: 2.3 },
  { id: 20, size: 1.4, x: 8, y: 88, delay: 0.1, duration: 4.3 },
  { id: 21, size: 2.3, x: 18, y: 52, delay: 0.6, duration: 3.4 },
  { id: 22, size: 1.2, x: 28, y: 30, delay: 1.1, duration: 2.5 },
  { id: 23, size: 2.7, x: 38, y: 18, delay: 1.6, duration: 3.6 },
  { id: 24, size: 1.6, x: 48, y: 62, delay: 2.0, duration: 2.8 },
]

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 50
    const y = (e.clientY - rect.top - rect.height / 2) / 50
    setMousePosition({ x, y })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden cosmic-bg"
      onMouseMove={handleMouseMove}
    >
      {/* Cosmic star particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>


      {/* Animated cosmic gradient orbs - dark mode only */}
      <div className="absolute inset-0 dark-only-effects">
        {/* Primary violet orb */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-aurora"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60%) 0%, hsl(280 70% 50%) 50%, transparent 70%)',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        {/* Secondary purple orb */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] animate-aurora"
          style={{
            background: 'radial-gradient(circle, hsl(260 70% 55%) 0%, hsl(290 60% 45%) 50%, transparent 70%)',
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '2s',
          }}
        />
        {/* Accent blue orb */}
        <div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(230 70% 60%) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* 3D Grid floor effect - dark mode only */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none dark-only-effects"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="absolute left-0 right-0 bottom-0 h-[60%] opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(270 80% 60% / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(270 80% 60% / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg) translateY(50%)',
            transformOrigin: 'center bottom',
          }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-24 pb-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Left side - Text content */}
        <div
          className={`flex-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          style={{
            transform: `translateX(${isVisible ? 0 : -48}px) translateY(${-scrollY * 0.1}px)`,
          }}
        >
          {/* Greeting badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
          >
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span className="text-sm text-primary font-semibold">Available for opportunities</span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-2"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            ML & Cloud
          </h1>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.3] pb-1"
            style={{
              background: 'linear-gradient(135deg, hsl(270 80% 65%) 0%, hsl(290 70% 55%) 50%, hsl(260 80% 70%) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 5s ease infinite',
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            Engineer
          </h2>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-lg mt-6 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Building intelligent systems with <span className="text-primary font-semibold">Machine Learning</span>,
            scalable <span className="text-primary font-semibold">Cloud Infrastructure</span>,
            and modern <span className="text-primary font-semibold">DevOps</span> practices.
          </p>

          {/* CTA Buttons with 3D effect */}
          <div
            className={`flex items-center gap-4 mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-2xl font-semibold transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(270 80% 60%) 0%, hsl(280 70% 50%) 100%)',
                boxShadow: '0 10px 40px -10px hsl(270 80% 60% / 0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)',
              }}
            >
              <span className="relative z-10 text-white">Let's Connect</span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-4 text-foreground font-semibold hover:text-primary transition-all duration-300 rounded-2xl border border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              View Work
              <ArrowDown size={18} className="animate-bounce" />
            </a>
          </div>

          {/* Social links */}
          <div
            className={`flex items-center gap-4 mt-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="group w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                aria-label={label}
                style={{
                  boxShadow: '0 4px 20px -5px rgba(0,0,0,0.3)',
                }}
              >
                <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Right side - 3D Image */}
        <div
          className={`flex-1 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full max-w-[500px]"
            style={{
              transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Outer glow ring - dark mode only */}
            <div
              className="absolute -inset-8 rounded-full opacity-50 dark-only-effects"
              style={{
                background: 'conic-gradient(from 0deg, hsl(270 80% 60% / 0.4), transparent, hsl(290 70% 55% / 0.3), transparent, hsl(270 80% 60% / 0.4))',
                animation: 'spin 10s linear infinite',
              }}
            />

            {/* Floating orb background - dark mode only */}
            <div
              className="absolute -inset-4 rounded-full opacity-40 blur-2xl dark-only-effects"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(270 80% 60% / 0.4) 0%, hsl(290 70% 55% / 0.2) 50%, transparent 70%)',
              }}
            />

            {/* Main image container with 3D effect */}
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-primary/20"
              style={{
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.3)',
                transform: 'translateZ(50px)',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent z-10 pointer-events-none" />

              <Image
                src="/img/about.png"
                alt="Developer"
                width={500}
                height={500}
                className="relative object-cover w-full h-auto"
                priority
              />

              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                }}
              />
            </div>


            {/* Floating tech badges */}
            <div
              className="absolute -left-8 top-1/4 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-xl border border-border/50 shadow-xl animate-float-badge"
              style={{ transform: 'translateZ(60px)' }}
            >
              <span className="text-sm font-semibold text-foreground">500+ Projects</span>
            </div>
            <div
              className="absolute -right-4 bottom-1/4 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-xl border border-border/50 shadow-xl animate-float-badge-reverse"
              style={{ transform: 'translateZ(70px)', animationDelay: '1s' }}
            >
              <span className="text-sm font-semibold text-primary">ML Expert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack - 3D floating cards */}
      <div
        className={`max-w-7xl mx-auto w-full px-4 mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-primary/50" />
          Core Technologies
        </p>
        <div className="flex items-center gap-4 md:gap-6 flex-wrap">
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 cursor-pointer hover:scale-110 hover:-translate-y-2"
              style={{
                animationDelay: `${i * 100}ms`,
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:scale-110"
              />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-card/90 px-2 py-1 rounded-lg border border-border/50">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills Marquee */}
      <div
        className={`w-full mt-20 overflow-hidden border-t border-b border-border/30 py-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          background: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--card) / 0.5), hsl(var(--background)))',
        }}
      >
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...softSkills, ...softSkills, ...softSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mx-8 tracking-tight text-foreground/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState, useRef } from "react"

// Reduced to widely-known ML, Cloud, DevOps technologies
const skillsRows = [
    // Row 1 - Cloud & DevOps essentials
    [
        { name: "AWS", icon: "/img/aws-logo.svg", color: "#FF9900" },
        { name: "Azure", icon: "/img/azure-logo.svg", color: "#0089D6" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
        { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5", color: "#326CE5" },
        { name: "Jenkins", icon: "https://cdn.simpleicons.org/jenkins/D24939", color: "#D24939" },
        { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624", color: "#FCC624" },
    ],
    // Row 2 - ML & Data
    [
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
        { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00", color: "#FF6F00" },
        { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C", color: "#EE4C2C" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
        { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D", color: "#DC382D" },
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
    ],
]

function SkillIcon({ skill, index, rowIndex }: { skill: typeof skillsRows[0][0], index: number, rowIndex: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false)

    return (
        <div
            className="group relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`
          relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
          flex items-center justify-center 
          rounded-2xl 
          bg-gradient-to-br from-card/80 to-card/40
          border border-border/30
          backdrop-blur-sm
          transition-all duration-500 ease-out
          hover:scale-110 hover:-translate-y-3
          hover:border-primary/50
          hover:shadow-2xl hover:shadow-primary/20
          cursor-pointer
          ${isHovered ? 'z-20' : 'z-10'}
        `}
                style={{
                    boxShadow: isHovered
                        ? `0 25px 50px -12px ${skill.color}50, 0 0 40px -8px ${skill.color}40`
                        : 'none',
                }}
            >
                {/* Glow effect on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at center, ${skill.color}25 0%, transparent 70%)`,
                    }}
                />

                {/* Icon */}
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                    {!imageError ? (
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-contain transition-all duration-300"
                            style={{
                                filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 10px ' + skill.color + '80)' : 'none',
                            }}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <span
                            className="text-sm md:text-base font-bold transition-colors duration-300"
                            style={{ color: isHovered ? skill.color : 'hsl(var(--foreground))' }}
                        >
                            {skill.name.slice(0, 3).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            {/* Tooltip */}
            <div
                className={`
          absolute -bottom-12 left-1/2 -translate-x-1/2 
          px-4 py-2 
          bg-card/95 backdrop-blur-sm
          border border-primary/30
          rounded-xl 
          text-sm font-semibold text-foreground
          whitespace-nowrap
          transition-all duration-300
          pointer-events-none
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
            >
                {skill.name}
                <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card/95 border-l border-t border-primary/30 rotate-45"
                />
            </div>
        </div>
    )
}

function SkillRow({ skills, rowIndex, direction }: { skills: typeof skillsRows[0], rowIndex: number, direction: 'left' | 'right' }) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        if (rowRef.current) observer.observe(rowRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={rowRef}
            className={`
        flex items-center justify-center gap-6 md:gap-8 lg:gap-10 py-6 overflow-hidden
        transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
            style={{ transitionDelay: `${rowIndex * 150}ms` }}
        >
            <div
                className={`
          flex items-center gap-6 md:gap-8 lg:gap-10
          ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}
        `}
            >
                {/* Triple the items for smoother infinite scroll */}
                {[...skills, ...skills, ...skills].map((skill, index) => (
                    <SkillIcon
                        key={`${skill.name}-${index}`}
                        skill={skill}
                        index={index % skills.length}
                        rowIndex={rowIndex}
                    />
                ))}
            </div>
        </div>
    )
}

export default function SkillsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-24 md:py-32 overflow-hidden"
        >
            {/* Radial gradient background - dark mode only */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0817] to-transparent dark-only-effects" />

            {/* Central glow effect - dark mode only */}
            <div className="absolute inset-0 flex items-center justify-center dark-only-effects">
                <div
                    className="w-[1000px] h-[500px] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(ellipse at center, hsl(270 60% 20% / 0.5) 0%, hsl(280 50% 15% / 0.3) 30%, transparent 60%)',
                    }}
                />
            </div>


            {/* Light rays effect - dark mode only */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none dark-only-effects">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[500px] w-[2px] origin-center"
                        style={{
                            transform: `rotate(${i * 45}deg)`,
                            background: `linear-gradient(to top, transparent 20%, hsl(280 60% 50% / 0.06) 50%, transparent 80%)`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <div
                    className={`
            text-center mb-16
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
          `}
                >
                    <p className="text-lg md:text-xl text-muted-foreground mb-4 font-light italic">
                        Never miss a task, deadline or idea.
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        My <span className="text-primary">Skills</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Technologies I work with for{" "}
                        <span className="text-primary font-semibold">Machine Learning</span>,{" "}
                        <span className="text-primary font-semibold">Cloud</span>, and{" "}
                        <span className="text-primary font-semibold">DevOps</span>
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="space-y-6 md:space-y-10">
                    {skillsRows.map((row, rowIndex) => (
                        <SkillRow
                            key={rowIndex}
                            skills={row}
                            rowIndex={rowIndex}
                            direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

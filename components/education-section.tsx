"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, BookOpen } from "lucide-react"
import SectionWrapper from "./section-wrapper"

interface AcademicActivity {
  title: string
  institution: string
  duration: string
  period: string
  description: string
}

const activities: AcademicActivity[] = [
  {
    title: "Teaching Assistant - Data Structures",
    institution: "UFOP",
    duration: "6 months",
    period: "Sep 2019 - Mar 2020",
    description:
      "Supported the Data Structures course by creating exercises, reviewing assignments, and assisting students with coding challenges. Topics included algorithm complexity, recursion, lists, stacks, queues, sorting algorithms, binary and AVL trees, and hash tables.",
  },
  {
    title: "Undergraduate Research - High Performance Computing (HPC)",
    institution: "UFOP",
    duration: "1 month",
    period: "Aug 2019 - Sep 2019",
    description:
      "Contributed to the development of JCL-Opt, a Java-based framework that applies optimization techniques like backtracking and permutations on distributed systems using JCL. Focused on modular design, load balancing, and efficient data handling strategies.",
  },
  {
    title: "Participant - opCod3rs Program",
    institution: "UFOP",
    duration: "10 months",
    period: "Aug 2018 - Jun 2019",
    description:
      "Took part in a competitive programming training program aimed at preparing students for algorithmic challenges and ICPC-style contests. Regularly practiced advanced data structures, dynamic programming, and graph theory through weekly problem-solving sessions.",
  },
]

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionWrapper id="education">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-lg text-muted-foreground">
            Where <span className="text-primary font-semibold">theory</span>,{" "}
            <span className="text-primary font-semibold">research</span>, and{" "}
            <span className="text-primary font-semibold">teaching</span> shaped the foundations of how I
            think and build
          </p>
        </div>

        {/* Degree Card */}
        <div
          className={`flex items-start gap-5 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-card border border-border/50 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" />
              Bachelor of Science in Computer Science (B.Sc.)
            </h3>
            <p className="text-muted-foreground">Federal University of Ouro Preto (UFOP)</p>
            <p className="text-sm italic text-muted-foreground">
              Universidade Federal de Ouro Preto
            </p>
            <p className="text-sm text-muted-foreground mt-1">Aug 2018 - Apr 2025</p>
          </div>
        </div>

        {/* Academic Activities */}
        <div className="relative ml-7 pl-8 border-l-2 border-border/40">
          {activities.map((activity, i) => (
            <div
              key={activity.title}
              className={`relative mb-10 last:mb-0 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              {/* Dot on timeline */}
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-border" />

              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} className="text-primary" />
                <h4 className="text-lg font-bold text-foreground">{activity.title}</h4>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>{activity.institution}</span>
                <span className="text-border">{"•"}</span>
                <span>{activity.duration}</span>
              </div>
              <p className="text-sm italic text-muted-foreground mb-3">{activity.period}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

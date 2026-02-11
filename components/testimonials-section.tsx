"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"
import SectionWrapper from "./section-wrapper"

interface Testimonial {
  text: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    text: "I've had the pleasure of witnessing Matheus' professional journey since his early days in the tech field, and I've always been impressed by how quickly and deeply he learns. He approaches challenges with an open and collaborative mindset. Even when he's not the most senior person on the team, he consistently steps up to support both projects and teammates. Matheus is someone who's always seeking to grow \u2014 whether by learning from his colleagues, reflecting on his own work, or understanding the broader impact of the products he helps build. On top of that, he maintains excellent interpersonal relationships and contributes to a positive team dynamic. In a market where effective results through technology are increasingly sought, Matheus is the kind of professional you can rely on. Whenever I have the opportunity, I invite him to join my projects.",
    author: "Jo\u00e3o Marcos",
    role: "Front-end Engineering | Tech Lead | Chapter Lead",
  },
  {
    text: "Working with Matheus was an enriching experience. Since his very first professional role, his eagerness to learn and overcome challenges has always stood out. I had the privilege of closely following his growth, as we were part of the same team, and I can confidently say: he is relentless. He always gives his best, collaborates excellently, is ready to help, and is constantly seeking new knowledge. A great example of this was our many conversations about design\u2014not just product design, but design as a discipline. Matheus was one of the key advocates for design quality in our context, always going above and beyond to contribute. His growth is inevitable, and any team would be lucky to have him. A highly recommended professional!",
    author: "F\u00e1bio Gomide",
    role: "Senior Product Designer",
  },
  {
    text: "Matheus is one of those people who naturally elevate the environment just by being around. Whether solving a problem or helping someone along the way, he brings clarity, focus, and a calm energy that makes everything flow more smoothly. During the time we studied together, I saw firsthand how dedicated he is \u2014 not just to the task at hand, but to doing it well, with attention to detail and consistency. He has an energy that inspires and drives those around him. Working with him was always a smooth and motivating experience.",
    author: "Gabriel Caetano Ara\u00fajo",
    role: "Product Tech Lead",
  },
  {
    text: "Matheus has excellent technical skills, the ability to solve complex problems, great strategic vision and leadership. Also, has qualities as a person, fundamental in any organization, such as communication skills, resilience and always willing to help. We graduated college together and I believe that Matheus has all the conditions to develop further in his career, constituting an asset of enormous value for any organization.",
    author: "Lucas Urzedo",
    role: "DataOps Engineer",
  },
  {
    text: "Matheus is one of the greatest developers I have worked with. He has great tech skills and is a team player, helping his coworkers and contributing to a better workplace. Also, he's an excellent problem solver, and helped the team to improve our platforms with good performance and clean code. I hope we can work together again sometime.",
    author: "Levi Frota",
    role: "Front-End Developer",
  },
  {
    text: "I had the pleasure of studying alongside Matheus. From the beginning, it was clear that he stood out for his technical skills, critical thinking, and collaborative spirit. He consistently approached problems with creativity and was always willing to help others grasp complex topics. Whether working on academic projects or exploring personal tech interests, he brought a strong work ethic and a passion for learning that made him a valuable friend during the period we studied together and the years after.",
    author: "Caio Costa",
    role: "Data Engineer",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
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
    <div
      ref={ref}
      className={`bg-card rounded-xl border border-border/50 p-6 lg:p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 flex flex-col ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Quote size={28} className="text-primary/40 mb-4 flex-shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
        {testimonial.text}
      </p>
      <div className="border-t border-border/30 pt-4">
        <p className="font-semibold text-foreground">
          {"— "}{testimonial.author}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From <span className="text-primary font-semibold">Clients</span>,{" "}
            <span className="text-primary font-semibold">Teammates</span>, and{" "}
            <span className="text-primary font-semibold">Classmates</span> who have collaborated with
            me along the way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

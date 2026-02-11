"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Mail, MapPin, Phone, ArrowUpRight, Loader2 } from "lucide-react"
import SectionWrapper from "./section-wrapper"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <SectionWrapper id="contact">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-semibold">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a <span className="text-primary font-semibold">project in mind</span>, a{" "}
            <span className="text-primary font-semibold">question</span>, or just want to{" "}
            <span className="text-primary font-semibold">connect</span>?
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left side - Contact Info */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>
            </div>

            {/* Contact cards with 3D hover */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`group relative flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/30 
                      hover:border-primary/30 transition-all duration-500
                      hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{
                      transitionDelay: `${300 + index * 100}ms`,
                      perspective: '1000px',
                    }}
                  >
                    {/* Icon container with 3D effect */}
                    <div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 
                        flex items-center justify-center transition-all duration-300
                        group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        boxShadow: '0 4px 15px -5px hsl(var(--primary) / 0.2)',
                      }}
                    >
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-foreground font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground/50 group-hover:text-primary transition-all duration-300
                        group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                )
              })}
            </div>

            {/* Decorative element */}
            <div className="hidden lg:block pt-8">
              <div className="relative w-full h-32 rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-muted-foreground italic">
                    "Great things happen when we work together."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form with 3D effects */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onMouseMove={handleMouseMove}
              className="relative p-8 md:p-10 rounded-3xl bg-card border border-border/30 overflow-hidden"
              style={{
                boxShadow: '0 20px 50px -15px rgba(0,0,0,0.2), 0 0 0 1px hsl(var(--border) / 0.5)',
              }}
            >
              {/* Spotlight effect following cursor */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--primary) / 0.08) 0%, transparent 40%)`,
                }}
              />

              {/* Form fields */}
              <div className="relative space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-semibold transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : 'text-foreground'
                      }`}
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 bg-muted/30 border border-border/50 rounded-xl 
                        text-foreground placeholder:text-muted-foreground/50 
                        focus:outline-none focus:border-primary/50 focus:bg-muted/50
                        focus:shadow-lg focus:shadow-primary/10
                        transition-all duration-300"
                    />
                    {/* Focus glow */}
                    <div
                      className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-100' : 'opacity-0'
                        }`}
                      style={{
                        boxShadow: '0 0 0 2px hsl(var(--primary) / 0.2), 0 0 30px -5px hsl(var(--primary) / 0.3)',
                      }}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-semibold transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-foreground'
                      }`}
                  >
                    E-mail <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 bg-muted/30 border border-border/50 rounded-xl 
                        text-foreground placeholder:text-muted-foreground/50 
                        focus:outline-none focus:border-primary/50 focus:bg-muted/50
                        focus:shadow-lg focus:shadow-primary/10
                        transition-all duration-300"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                        }`}
                      style={{
                        boxShadow: '0 0 0 2px hsl(var(--primary) / 0.2), 0 0 30px -5px hsl(var(--primary) / 0.3)',
                      }}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="message"
                      className={`block text-sm font-semibold transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : 'text-foreground'
                        }`}
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setFormData({ ...formData, message: e.target.value })
                        }
                      }}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-5 py-4 bg-muted/30 border border-border/50 rounded-xl 
                        text-foreground placeholder:text-muted-foreground/50 
                        focus:outline-none focus:border-primary/50 focus:bg-muted/50
                        focus:shadow-lg focus:shadow-primary/10
                        transition-all duration-300 resize-none"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-100' : 'opacity-0'
                        }`}
                      style={{
                        boxShadow: '0 0 0 2px hsl(var(--primary) / 0.2), 0 0 30px -5px hsl(var(--primary) / 0.3)',
                      }}
                    />
                  </div>
                </div>

                {/* Submit button with 3D press effect */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto inline-flex items-center justify-center gap-3 
                    px-8 py-4 rounded-xl font-semibold
                    transition-all duration-300
                    hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-lg
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(36 100% 40%) 100%)',
                    boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.5), inset 0 1px 0 0 rgba(255,255,255,0.2), inset 0 -2px 0 0 rgba(0,0,0,0.1)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="text-primary-foreground animate-spin" />
                      <span className="text-primary-foreground">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="text-primary-foreground transition-transform group-hover:rotate-12" />
                      <span className="text-primary-foreground">Send Message</span>
                    </>
                  )}

                  {/* Shine effect */}
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

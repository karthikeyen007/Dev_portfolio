"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experiences", href: "#experiences" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.substring(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#home")
            }}
            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary font-mono text-sm">{"<"}</span>
            <span className="text-lg font-semibold tracking-tight">Karthikeyan V</span>
            <span className="text-primary font-mono text-sm">{"/>"}</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm transition-all duration-300 relative pb-1 ${activeSection === link.href.substring(1)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="text-primary hover:text-primary/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-2xl font-medium transition-all duration-300 ${activeSection === link.href.substring(1)
                ? "text-primary"
                : "text-foreground hover:text-primary"
                }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

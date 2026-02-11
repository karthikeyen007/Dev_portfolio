"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            {"Copyright \u00A9 2025 - Karthikeyan V"}
          </p>
          <p>All Rights Reserved</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300 ${showScroll
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}

"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center">
                <Moon size={18} className="text-muted-foreground" />
            </div>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center 
        hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 
        hover:scale-110 hover:shadow-lg hover:shadow-primary/20
        group overflow-hidden"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Moon icon - visible in dark mode */}
            <Moon
                size={18}
                className={`absolute transition-all duration-500 ${theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-0'
                    } text-primary`}
            />

            {/* Sun icon - visible in light mode */}
            <Sun
                size={18}
                className={`absolute transition-all duration-500 ${theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 rotate-90 scale-0'
                    } text-primary`}
            />

            {/* Glow effect */}
            <div
                className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${theme === 'dark'
                        ? 'bg-gradient-to-br from-violet-500/10 to-purple-600/10'
                        : 'bg-gradient-to-br from-amber-400/10 to-orange-500/10'
                    } opacity-0 group-hover:opacity-100`}
            />
        </button>
    )
}

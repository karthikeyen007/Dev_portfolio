"use client"

export default function SideDecoration() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-12 z-30 hidden lg:flex flex-col items-center justify-center pointer-events-none">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20"
          />
        ))}
      </div>
    </div>
  )
}

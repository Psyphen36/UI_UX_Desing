import { ReactNode, useEffect, useRef } from "react"

const ParallaxContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX - innerWidth / 2) / innerWidth
      const y = (e.clientY - innerHeight / 2) / innerHeight

      const layers = containerRef.current?.querySelectorAll(".parallax-layer") || []
      layers.forEach((layer, i) => {
        const depth = i + 1
        const moveX = x * depth * 20
        const moveY = y * depth * 20
        ;(layer as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + depth * 0.1})`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return <div ref={containerRef}>{children}</div>
}

export default ParallaxContainer

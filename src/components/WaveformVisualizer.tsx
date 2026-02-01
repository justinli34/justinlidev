import { useRef, useEffect } from 'react'

// Ripple wobble effect configuration (easily customizable)
const WOBBLE_AMPLITUDE = 10       // pixels of vertical movement
const WOBBLE_DURATION = 500      // ms duration of the wobble
const WOBBLE_PAUSE = 3000        // ms pause between wobbles
const WOBBLE_WAVELENGTH = 15    // pixels per wave cycle
const WOBBLE_SPEED = 2           // how fast ripple travels (pixels per ms)

interface WaveformVisualizerProps {
  analyzerRef: React.RefObject<AnalyserNode | null>
  isPlaying: boolean
  baselineOffset: number
  hasInteracted: boolean
  onClick: () => void
}

export function WaveformVisualizer({
  analyzerRef,
  isPlaying,
  baselineOffset,
  hasInteracted,
  onClick,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastPointsRef = useRef<{ x: number; y: number }[] | null>(null)
  const pulseStartTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get CSS custom properties for customization
    const computedStyle = getComputedStyle(document.documentElement)
    const waveformColor = computedStyle.getPropertyValue('--waveform-color').trim()

    const drawCurve = (points: { x: number; y: number }[]) => {
      ctx.beginPath()
      ctx.strokeStyle = waveformColor
      ctx.lineWidth = 2
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.stroke()
    }

    const draw = (timestamp: number) => {
      const analyzer = analyzerRef.current

      // Set canvas size to match display size
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      if (!analyzer || !isPlaying) {
        // When paused, draw the last captured frame (or flat/pulsing line if never played)
        if (lastPointsRef.current) {
          // User has played before - show frozen waveform
          drawCurve(lastPointsRef.current)
        } else if (!hasInteracted) {
          // Never interacted - show ripple wobble effect (quick ripple then pause)
          if (pulseStartTimeRef.current === null) {
            pulseStartTimeRef.current = timestamp
          }
          const elapsed = timestamp - pulseStartTimeRef.current
          const cycleTime = WOBBLE_DURATION + WOBBLE_PAUSE
          const timeInCycle = elapsed % cycleTime

          const baseY = rect.height - baselineOffset
          const numPoints = 64
          const points: { x: number; y: number }[] = []

          for (let i = 0; i < numPoints; i++) {
            const x = (i / (numPoints - 1)) * rect.width
            let y = baseY

            if (timeInCycle < WOBBLE_DURATION) {
              // During wobble phase - ripple wave that travels and decays
              const wobbleProgress = timeInCycle / WOBBLE_DURATION
              const decay = 1 - wobbleProgress
              // Phase based on x position minus time creates rightward travel
              const phase = (x / WOBBLE_WAVELENGTH) * Math.PI * 2 - timeInCycle * WOBBLE_SPEED * 0.01
              y = baseY + Math.sin(phase) * WOBBLE_AMPLITUDE * decay
            }
            // During pause phase, y stays at baseY (flat line)

            points.push({ x, y })
          }

          drawCurve(points)

          // Continue animation for pulse
          animationRef.current = requestAnimationFrame(draw)
          return
        } else {
          // Has interacted but no waveform data yet - flat line
          ctx.beginPath()
          ctx.strokeStyle = waveformColor
          ctx.lineWidth = 2
          ctx.moveTo(0, rect.height - baselineOffset)
          ctx.lineTo(rect.width, rect.height - baselineOffset)
          ctx.stroke()
        }
        return
      }

      // Get frequency data
      const bufferLength = analyzer.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyzer.getByteFrequencyData(dataArray)

      // Number of points for the curve (higher = smoother)
      const numPoints = 128

      // Build points array with logarithmic frequency mapping
      const points: { x: number; y: number }[] = []

      for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * rect.width

        const freqIndex = Math.floor(Math.pow(i / numPoints, 2) * bufferLength * 0.4)
        const value = dataArray[freqIndex] / 255
        const y = rect.height - baselineOffset - value * (rect.height - baselineOffset)

        points.push({ x, y })
      }

      // Store current points for freeze on pause
      lastPointsRef.current = points

      // Draw smooth curve using quadratic bezier curves
      drawCurve(points)

      animationRef.current = requestAnimationFrame(draw)
    }

    // Start animation loop
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [analyzerRef, isPlaying, hasInteracted, baselineOffset])

  return (
    <div className="waveform-container" onClick={onClick}>
      <canvas ref={canvasRef} className="waveform-canvas" />
    </div>
  )
}

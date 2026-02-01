import { useRef, useState, useCallback, useEffect } from 'react'

export function useAudioAnalyzer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.7
    audioRef.current = audio

    // Handle audio ending or errors
    audio.addEventListener('ended', () => setIsPlaying(false))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('play', () => setIsPlaying(true))

    return () => {
      audio.pause()
      audio.src = ''
      audioContextRef.current?.close()
    }
  }, [])

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new AudioContext()
      const analyzer = audioContext.createAnalyser()
      analyzer.fftSize = 8192
      analyzer.smoothingTimeConstant = 0.85

      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyzer)
      analyzer.connect(audioContext.destination)

      audioContextRef.current = audioContext
      analyzerRef.current = analyzer
      sourceRef.current = source
    }
  }, [])

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return

    // Initialize audio context on first interaction (required by browsers)
    initAudioContext()

    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      await audioRef.current.play()
    }
  }, [isPlaying, initAudioContext])

  return {
    isPlaying,
    togglePlay,
    analyzerRef,
  }
}

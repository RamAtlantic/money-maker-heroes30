"use client"

import { useEffect, useState } from "react"

interface GifBackgroundProps {
  src: string
  fallbackSrc?: string
  className?: string
  alt?: string
  priority?: boolean
}

export function GifBackground({
  src,
  fallbackSrc,
  className = "",
  alt = "Background animation",
  priority = false
}: GifBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setHasError(true)
    img.src = src
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  if (hasError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-black animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

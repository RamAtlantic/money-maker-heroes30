"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  // Props específicas para Instagram
  instagramOptimized?: boolean
  aspectRatio?: "square" | "portrait" | "landscape" | "story"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  sizes,
  fill = false,
  style,
  onLoad,
  onError,
  instagramOptimized = false,
  aspectRatio = "square",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Configuraciones optimizadas para Instagram
  const getInstagramConfig = () => {
    switch (aspectRatio) {
      case "square":
        return {
          width: 1080,
          height: 1080,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
      case "portrait":
        return {
          width: 1080,
          height: 1350,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
      case "landscape":
        return {
          width: 1080,
          height: 608,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
      case "story":
        return {
          width: 1080,
          height: 1920,
          sizes: "(max-width: 768px) 100vw, 50vw"
        }
      default:
        return {
          width: 1080,
          height: 1080,
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
    }
  }

  const instagramConfig = instagramOptimized ? getInstagramConfig() : { width: undefined, height: undefined, sizes: undefined }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-gray-200 animate-pulse flex items-center justify-center text-gray-500 text-sm",
          className
        )}
        style={{
          width: fill ? "100%" : width || instagramConfig.width || 300,
          height: fill ? "100%" : height || instagramConfig.height || 300,
          ...style
        }}
      >
        Error al cargar imagen
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && !priority && (
        <div
          className="absolute inset-0 bg-gray-900 animate-pulse"
          style={{
            width: fill ? "100%" : width || instagramConfig.width || 300,
            height: fill ? "100%" : height || instagramConfig.height || 300,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width || instagramConfig.width}
        height={fill ? undefined : height || instagramConfig.height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        sizes={sizes || instagramConfig.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          fill ? "object-cover" : ""
        )}
        {...props}
      />
    </div>
  )
}

// Componente específico para logos con optimización automática
export function OptimizedLogo({
  src,
  alt,
  className = "",
  ...props
}: Omit<OptimizedImageProps, 'instagramOptimized' | 'aspectRatio'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn("object-contain", className)}
      quality={95}
      priority={true}
      placeholder="empty"
      {...props}
    />
  )
}

// Componente específico para botones con optimización automática
export function OptimizedButton({
  src,
  alt,
  className = "",
  ...props
}: Omit<OptimizedImageProps, 'instagramOptimized' | 'aspectRatio'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn("object-contain cursor-pointer hover:scale-105 transition-transform duration-300", className)}
      quality={90}
      placeholder="empty"
      {...props}
    />
  )
}

// Componente específico para contenido optimizado para Instagram
export function InstagramOptimizedImage({
  src,
  alt,
  aspectRatio = "square",
  className = "",
  priority = false,
  ...props
}: Omit<OptimizedImageProps, 'instagramOptimized'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      instagramOptimized={true}
      aspectRatio={aspectRatio}
      priority={priority}
      quality={95}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

// Componente para posts de Instagram con formato específico
export function InstagramPost({
  src,
  alt,
  format = "feed", // "feed", "story", "reel"
  className = "",
  ...props
}: Omit<OptimizedImageProps, 'instagramOptimized' | 'aspectRatio'> & {
  format?: "feed" | "story" | "reel"
}) {
  const getFormatConfig = () => {
    switch (format) {
      case "feed":
        return { width: 1080, height: 1080, aspectRatio: "square" as const }
      case "story":
        return { width: 1080, height: 1920, aspectRatio: "story" as const }
      case "reel":
        return { width: 1080, height: 1920, aspectRatio: "story" as const }
      default:
        return { width: 1080, height: 1080, aspectRatio: "square" as const }
    }
  }

  const config = getFormatConfig()

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={config.width}
      height={config.height}
      className={cn("object-cover", className)}
      instagramOptimized={true}
      aspectRatio={config.aspectRatio}
      quality={95}
      sizes="100vw"
      {...props}
    />
  )
}

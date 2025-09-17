"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { LeadFormModal } from "@/components/modal-lead"

export default function Page() {
  const [showImages, setShowImages] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // Min delay and initial width detection for loading
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [minDelayDone, setMinDelayDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowImages(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleButton = () => {
    setOpenForm(true)
  }

  // Detect viewport to toggle between mobile and desktop
  useEffect(() => {
    const detect = () => setIsDesktop(window.innerWidth >= 1024)
    detect()
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Ensure at least 1000ms loading
  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const ready = isDesktop !== null && minDelayDone

  // Loading: circular progress centered, black background
  if (!ready) {
    return (
      <main className="relative min-h-screen bg-black grid place-items-center">
        <div className="flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-white animate-spin" aria-hidden="true" />
          <span className="sr-only">{"Cargando..."}</span>
        </div>
      </main>
    )
  }

  // ----------------------------- Desktop Return -----------------------------
  if (isDesktop) {
    return (
      <main className="relative bg-black min-h-screen">
        <DesktopBanner />

        {/* Video 1 (Desktop) */}
        <VideoSectionDesktop
          src={`/background-desktop.mp4`}
          label="Video 1 Desktop"
          id="d1"
        />

        {/* Logo principal (más grande en desktop) */}
        <img
          src={`/lctm.png`}
          alt="Logo principal"
          width={620}
          height={140}
          className="absolute top-70 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-10"
        />

        {/* Botón CTA (desktop) */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full z-20 cursor-pointer">
          {showButton && !openForm && (
            <button
              onClick={handleButton}
              className="bg-transparent text-black py-2 rounded-md cursor-pointer hover:scale-125 transition-transform duration-300"
            >
              <img
                src={`/button.png`}
                alt="Botón principal"
                width={560}
                height={160}
                className="object-contain pointer-events-none select-none"
              />
            </button>
          )}
        </div>



        {/* Más videos desktop */}
        <VideoSectionDesktop
          src={`/background-desktop-2.mp4`}
          label="Video 2 Desktop"
          id="d2"
        />

        <VideoSectionDesktop
          src={`/background-desktop-3.mp4`}
          label="Video 3 Desktop"
          id="d3"
        />
        <div className="h-[100px] w-full bg-black"></div>
        <button onClick={() => setOpenForm(true)}>      
        <VideoSectionDesktop
          src={`/background-desktop-4.mp4`}
          label="Video 4 Desktop"
          id="d4"
        />
          </button>

        {/* Spacer */}
        <section>
          <div className="h-24 bg-black" />
        </section>
        <DesktopFooter onOpenForm={() => setOpenForm(true)} />
                  {/* Spacer */}
       
        {/* Modal Lead */}
        <LeadFormModal open={openForm} onOpenChange={setOpenForm} baseUrl={process.env.NEXT_PUBLIC_BASE_URL} />
      </main>
    )
  }

  // ----------------------------- Mobile Return -----------------------------
  return (
    <main className="relative bg-black min-h-screen">
      {/* Video 1 */}
      <VideoSection
        src={`/landing-mobile4.mp4`}
        label="Video 1: Relámpagos y templo"
        id="1"
      />

      {/* Imagen base */}
      <img
        src={`/lctm.png`}
        alt="Logo principal"
        width={300}
        height={100}
        className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain z-10"
      />

      {showImages && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="animate-spin-slow">
            <img
              src={`/rulet2.png`}
              alt="Ruleta girando"
              width={300}
              height={300}
              className="object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      )}

      <div className="absolute top-[38%]  left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full z-20">
        {showButton && !openForm && (
          <button onClick={handleButton} className="bg-transparent text-black py-2 rounded-md ">
            <img
              src={`/button.png`}
              alt="Logo principal"
              width={300}
              height={100}
              className="object-contain pointer-events-none select-none"
            />
          </button>
        )}
      </div>

      {/* Spacer */}
      <section>
        <div className="h-20 bg-black" />
      </section>

      {/* Video 2 */}
      <VideoSection
        src={`/background-mobile-2.mp4`}
        label="Video 2: Relámpagos y templo"
        id="2"
      />

      <div className="absolute -bottom-0 flex justify-center items-center w-full z-20">
        {showButton && !openForm && (
          <button onClick={handleButton} className="bg-transparent text-black py-2 rounded-md">
            <img
              src={`/button-2.png`}
              alt="Logo principal"
              width={300}
              height={100}
              className="object-contain pointer-events-none select-none"
            />
          </button>
        )}
      </div>
      <div className="h-20 bg-black"></div>


      {/* Modal */}
      <LeadFormModal open={openForm} onOpenChange={setOpenForm} baseUrl={process.env.NEXT_PUBLIC_BASE_URL} />

      {/* Estilo para giro lento (solo si usas animate-spin-slow) */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}

/* ----------------------------- Banner Desktop ----------------------------- */
function DesktopBanner() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/90 to-transparent text-white py-4 px-8 flex justify-between items-center z-50 backdrop-blur-sm">
      <div className="flex items-center space-x-6">
        
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-300">Únete a la experiencia</div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
    </header>
  )
}

/* ----------------------------- Footer Desktop ----------------------------- */
function DesktopFooter({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <footer className="relative bg-black text-white pb-10 px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Línea divisoria y copyright */}
        <div className=" pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 MooneyMaker. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#terminos" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Términos de Uso
            </a>
            <a href="#privacidad" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>

     
    </footer>
  )
}



/* ----------------------------- VideoSection (Mobile-first) ----------------------------- */
function VideoSection({
  src = `/landing-mobile4.mp4`,
  label = "Sección de video",
  topFadeHeight = 200,
  sideFadeWidthMobile = 72,
  sideFadeWidthDesktop = 240,
  id,
}: {
  src?: string
  label?: string
  topFadeHeight?: number
  sideFadeWidthMobile?: number
  sideFadeWidthDesktop?: number
  id?: string
}) {
  const sideGradientL = "linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)"
  const sideGradientR = "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)"

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const videoClass = isDesktop ? "w-full h-full object-contain" : "w-auto h-auto max-w-full max-h-full object-contain"
  const topGradient = isDesktop
    ? "none"
    : "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 5%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.15) 90%, rgba(0,0,0,0.1) 95%, rgba(0,0,0,0.05) 100%)"

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 flex items-center justify-center ${id === "2" ? "w-full h-full" : "min-w-[95vw]"}`}
      >
        <video src={src} className={videoClass} autoPlay muted loop playsInline preload="auto" aria-label={label} />
      </div>

      {/* Fades grandes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0"
        style={{ height: `${topFadeHeight}px`, background: topGradient }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 md:hidden"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientL }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block"
        style={{
          width: `${sideFadeWidthDesktop}px`,
          background: sideGradientL,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 md:hidden"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientR }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 hidden md:block"
        style={{
          width: `${sideFadeWidthDesktop}px`,
          background: sideGradientR,
        }}
      />
    </section>
  )
}

/* ----------------------------- VideoSectionDesktop ----------------------------- */
function VideoSectionDesktop({
  src = "/landing-mobile4.mp4",
  label = "Sección de video",
  id,
}: {
  src?: string
  label?: string
  id?: string
}) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [viewHeight, setViewHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      setViewHeight(window.innerHeight)
      console.log('Current height:', window.innerHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const videoClass = isDesktop
    ? `w-full h-full ${id === "d3" && "object-contain"}`
    : "w-auto h-auto max-w-full max-h-full object-cover"

  return (
    <section className="relative h-[100vh] bg-black">
      <div
        className={`absolute inset-0 w-[100vw] ${viewHeight > 850 ? "h-[105vh]" : "h-[110vh]"} ${id === "d2" || id === "d3" ? "scale-85 hover:scale-95 transition-transform duration-300" : ""}`}
      >
        <video src={src} className={videoClass} autoPlay muted loop playsInline preload="auto" aria-label={label} />
      </div>
    </section>
  )
}

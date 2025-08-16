'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ShieldCheck, Loader2 } from 'lucide-react'

type LeadData = {
  username: string
  email: string
  phone: string
  password?: string
  confirmPassword?: string
}

type LeadFormModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  baseUrl?: string
  className?: string
}

const STORAGE_KEY = 'leadData'
const GREEN = '#7AFF38'
const GOLD = '#EFC146'


declare global {
  interface Window {
    fbq: any;
  }
}

export function LeadFormModal({
  open = false,
  onOpenChange = () => {},
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mooneymaker.co/home?ref=64349',
  className,
}: LeadFormModalProps) {
  const [data, setData] = React.useState<LeadData>({
    username: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = React.useState<Partial<Record<keyof LeadData, string>>>({})
  const [submitting, setSubmitting] = React.useState(false)

  // Prefill from localStorage on open
  React.useEffect(() => {
    if (open) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<LeadData>
          setData({
            username: parsed.username ?? '',
            email: parsed.email ?? '',
            phone: parsed.phone ?? '',
          })
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [open])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate(values: LeadData) {
    const next: Partial<Record<keyof LeadData, string>> = {}
    if (!values.username.trim()) next.username = 'Ingresá tu usuario'
    if (!values.email.trim() || !values.email.includes('@')) next.email = 'Ingresá un email válido'
    if (!values.phone.trim() || values.phone.replace(/\D/g, '').length < 6) next.phone = 'Ingresá un teléfono válido'
    return next
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    window.fbq("track", "StartTrial", {
      content_name: "Botón CTA",
      value: 0,
      currency: "USD",
    });
    const v = validate(data)
    setErrors(v)
    if (Object.values(v).some(Boolean)) return

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }))
      return
    }

    setSubmitting(true)
    try {
      // Persist
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      // Build URL with hash params
      const hash = [
        `username=${encodeURIComponent(data.username)}`,
        `email=${encodeURIComponent(data.email)}`,
        `phone=${encodeURIComponent(data.phone)}`,
        `password=${encodeURIComponent(data.password || '')}`
      ].join('&')
      const target = `${baseUrl}#${hash}`
      // Redirect
      window.location.href = target
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Remove default bg/border to allow custom neon frame
          'sm:max-w-[440px] border-none bg-transparent p-0 mt-6',
          className
        )}
      >
        {/* Neon outer frame */}
        <div
          className={cn(
            'relative rounded-2xl p-[1px]',
            'bg-gradient-to-b',
            // Green top to gold bottom for subtle casino vibe
            '',
            // Outer glow
            'shadow-[0_0_40px_rgba(122,255,56,0.35)]'
          )}
        >
          {/* Inner panel */}
          <div className="rounded-2xl bg-black/80 p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Completar tus datos</DialogTitle>
              <DialogDescription className="text-white/70">
                Registra tu usuario, email y teléfono para continuar.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[color:#7AFF38]">
                  Usuario
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="tu_usuario"
                  autoComplete="username"
                  required
                  className={cn(
                    'bg-black text-white placeholder:text-white/40',
                    'border border-white/10',
                    'focus-visible:ring-2 focus-visible:ring-[color:#7AFF38] focus-visible:ring-offset-0'
                  )}
                />
                {errors.username ? (
                  <p className="text-sm text-red-400">{errors.username}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[color:#7AFF38]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  className={cn(
                    'bg-black text-white placeholder:text-white/40',
                    'border border-white/10',
                    'focus-visible:ring-2 focus-visible:ring-[color:#7AFF38] focus-visible:ring-offset-0'
                  )}
                />
                {errors.email ? <p className="text-sm text-red-400">{errors.email}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[color:#7AFF38]">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={handleChange}
                  placeholder="+54 11 2345 6789"
                  autoComplete="tel"
                  required
                  className={cn(
                    'bg-black text-white placeholder:text-white/40',
                    'border border-white/10',
                    'focus-visible:ring-2 focus-visible:ring-[color:#7AFF38] focus-visible:ring-offset-0'
                  )}
                />
                {errors.phone ? <p className="text-sm text-red-400">{errors.phone}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[color:#7AFF38]">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password || ''}
                  onChange={handleChange}
                  placeholder="tu_contraseña"
                  autoComplete="new-password"
                  required
                  className={cn(
                    'bg-black text-white placeholder:text-white/40',
                    'border border-white/10',
                    'focus-visible:ring-2 focus-visible:ring-[color:#7AFF38] focus-visible:ring-offset-0'
                  )}
                />
                {errors.password ? <p className="text-sm text-red-400">{errors.password}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[color:#7AFF38]">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={data.confirmPassword || ''}
                  onChange={handleChange}
                  placeholder="confirmar_contraseña"
                  autoComplete="new-password"
                  required
                  className={cn(
                    'bg-black text-white placeholder:text-white/40',
                    'border border-white/10',
                    'focus-visible:ring-2 focus-visible:ring-[color:#7AFF38] focus-visible:ring-offset-0'
                  )}
                />
                {errors.confirmPassword ? <p className="text-sm text-red-400">{errors.confirmPassword}</p> : null}
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2">
                <ShieldCheck className="h-4 w-4 text-[color:#7AFF38]" aria-hidden="true" />
                <p className="text-xs text-white/70">
                  Protegemos tus datos. Podés editar tu información luego.
                </p>
              </div>

              <DialogFooter className="mt-2 gap-2 sm:gap-3">
              

                <Button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    'mt-',
                    'relative overflow-hidden',
                    // Remove default variant look
                    'border-0 text-black',
                    // Neon green primary with golden sheen toward bottom
                    'bg-gradient-to-b from-[#7AFF38] via-[#7AFF38] to-[#EFC146]',
                    // Thicker rounded to match screenshot button
                    'rounded-full px-5 py-5',
                    // Inner glow
                    'shadow-[0_8px_24px_rgba(122,255,56,0.45),inset_0_-2px_0_rgba(0,0,0,0.2)]',
                    'hover:shadow-[0_10px_28px_rgba(122,255,56,0.6),inset_0_-2px_0_rgba(0,0,0,0.25)]',
                    'transition'
                  )}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Redirigiendo...</span>
                    </span>
                  ) : (
                    <span className="font-extrabold uppercase tracking-wide">
                      Quiero mi bono del 20%
                    </span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

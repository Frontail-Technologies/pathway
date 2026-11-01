'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { OTP_LENGTH } from '../lib/auth-helpers'

/**
 * Six single-digit boxes that behave like one field: typing advances, Backspace goes back, arrow keys move,
 * and pasting a whole code (or SMS autofill via autocomplete="one-time-code") fills every box.
 */
export function OtpInput({ value, onChange, onComplete, invalid, describedBy }: { value: string; onChange: (value: string) => void; onComplete?: (value: string) => void; invalid?: boolean; describedBy?: string }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const focus = (index: number) => refs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus()

  const write = (from: number, digits: string) => {
    const chars = value.padEnd(OTP_LENGTH, ' ').split('')
    digits.split('').forEach((digit, offset) => {
      if (from + offset < OTP_LENGTH) chars[from + offset] = digit
    })
    const next = chars.join('').replace(/\s+$/, '')
    onChange(next)
    focus(from + digits.length)
    if (/^\d{6}$/.test(next)) onComplete?.(next)
  }

  return (
    <div className="flex gap-2 sm:gap-2.5" role="group" aria-label="Verification code">
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element
          }}
          value={value[index]?.trim() ?? ''}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={index === 0 ? OTP_LENGTH : 1}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          autoFocus={index === 0}
          onFocus={(event) => event.target.select()}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, '')
            if (digits) write(index, digits.slice(0, OTP_LENGTH - index))
          }}
          onPaste={(event) => {
            const digits = event.clipboardData.getData('text').replace(/\D/g, '')
            if (!digits) return
            event.preventDefault()
            write(0, digits.slice(0, OTP_LENGTH))
          }}
          onKeyDown={(event) => {
            if (event.key === 'Backspace') {
              event.preventDefault()
              const chars = value.padEnd(OTP_LENGTH, ' ').split('')
              const target = chars[index]?.trim() ? index : index - 1
              if (target < 0) return
              chars[target] = ' '
              onChange(chars.join('').replace(/\s+$/, ''))
              focus(target)
            } else if (event.key === 'ArrowLeft') focus(index - 1)
            else if (event.key === 'ArrowRight') focus(index + 1)
          }}
          className={cn(
            'h-12 w-full min-w-0 rounded-[10px] border bg-background text-center font-heading text-xl font-bold text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 sm:h-14',
            invalid ? 'border-destructive' : 'border-border',
          )}
        />
      ))}
    </div>
  )
}

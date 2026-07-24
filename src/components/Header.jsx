import { useState } from 'react'
import { Link } from 'react-router-dom'

function LogoSlot() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-dashed border-black/15 px-1 text-center text-[8px] leading-tight text-ink-soft/70 sm:h-20 sm:w-32">
        Logo del comité de derecho
      </div>
    )
  }

  return (
    <img
      src="/logo-comite-derecho.png"
      alt="Logo del comité de derecho"
      onError={() => setFailed(true)}
      className="h-16 w-auto max-w-full shrink-0 object-contain sm:h-20"
    />
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-paper/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-4 py-6 sm:px-6">
        <Link to="/" className="shrink-0">
          <LogoSlot />
        </Link>

        <Link to="/" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Simposio de Métodos de Investigación
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Galería de Ensayos Universitarios
          </h1>
        </Link>
      </div>
    </header>
  )
}

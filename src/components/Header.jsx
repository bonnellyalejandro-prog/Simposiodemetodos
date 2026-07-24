import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Link to="/" className="block text-center">
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

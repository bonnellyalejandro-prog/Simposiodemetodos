import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h2 className="font-display text-2xl text-ink">Ensayo no encontrado</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Puede que el enlace sea incorrecto o el ensayo haya sido movido.
      </p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
        ← Volver a la galería
      </Link>
    </div>
  )
}

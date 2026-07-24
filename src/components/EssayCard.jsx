import { Link } from 'react-router-dom'
import { colorForTema } from '../lib/temaColor.js'

const TIPO_LABEL = {
  pdf: 'PDF',
  docx: 'Word',
}

function formatFecha(fecha) {
  if (!fecha) return ''
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  return d.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EssayCard({ essay }) {
  const color = colorForTema(essay.tema)

  return (
    <Link
      to={`/ensayo/${essay.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(33,29,43,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_32px_-16px_rgba(33,29,43,0.28)]"
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color.text }} />

      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {essay.tema}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
            {TIPO_LABEL[essay.tipo] ?? essay.tipo}
          </span>
        </div>

        <h2 className="mt-4 font-display text-xl leading-snug text-ink transition group-hover:text-accent">
          {essay.titulo}
        </h2>

        {essay.resumen && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {essay.resumen}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3 text-sm">
        <span className="font-medium text-ink">{essay.autor}</span>
        <span className="text-ink-soft">{formatFecha(essay.fecha)}</span>
      </div>
    </Link>
  )
}

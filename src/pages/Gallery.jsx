import { useMemo, useState } from 'react'
import { getAllEssays } from '../lib/loadEssays.js'
import EssayCard from '../components/EssayCard.jsx'

export default function Gallery() {
  const essays = useMemo(() => getAllEssays(), [])
  const [query, setQuery] = useState('')
  const [tema, setTema] = useState('todos')

  const temas = useMemo(
    () => ['todos', ...new Set(essays.map((e) => e.tema).filter(Boolean))],
    [essays],
  )

  const filtered = essays.filter((essay) => {
    const matchesTema = tema === 'todos' || essay.tema === tema
    const matchesQuery =
      query.trim() === '' ||
      [essay.titulo, essay.autor, essay.resumen]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query.toLowerCase()))
    return matchesTema && matchesQuery
  })

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Ensayos</h2>
          <p className="text-sm text-ink-soft">
            {essays.length} ensayo{essays.length === 1 ? '' : 's'} publicado
            {essays.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, autor o resumen…"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 sm:w-64"
          />
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
          >
            {temas.map((t) => (
              <option key={t} value={t}>
                {t === 'todos' ? 'Todos los temas' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-soft">
          No se encontraron ensayos con ese criterio.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      )}
    </div>
  )
}

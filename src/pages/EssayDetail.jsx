import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import mammoth from 'mammoth'
import { getEssayById } from '../lib/loadEssays.js'
import { colorForTema } from '../lib/temaColor.js'
import NotFound from './NotFound.jsx'

function formatFecha(fecha) {
  if (!fecha) return ''
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  return d.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })
}

function DocxViewer({ url }) {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [html, setHtml] = useState('')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo descargar el archivo')
        return res.arrayBuffer()
      })
      .then((buffer) => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then((result) => {
        if (cancelled) return
        setHtml(result.value)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [url])

  if (status === 'loading') {
    return <p className="py-10 text-center text-sm text-ink-soft">Cargando documento…</p>
  }

  if (status === 'error') {
    return (
      <p className="py-10 text-center text-sm text-red-600">
        No se pudo cargar la vista previa del documento. Puedes descargarlo con el botón de
        arriba.
      </p>
    )
  }

  return (
    <div
      className="prose prose-neutral max-w-none rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(33,29,43,0.06)] prose-headings:font-display prose-headings:text-ink prose-p:text-ink/90 prose-a:text-accent sm:p-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function PdfViewer({ url, titulo }) {
  return (
    <iframe
      src={url}
      title={titulo}
      className="h-[85vh] w-full rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(33,29,43,0.06)]"
    />
  )
}

export default function EssayDetail() {
  const { id } = useParams()
  const essay = getEssayById(id)

  if (!essay) return <NotFound />

  const color = colorForTema(essay.tema)

  return (
    <div>
      <Link to="/" className="text-sm font-medium text-accent hover:underline">
        ← Volver a la galería
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {essay.tema}
          </span>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {essay.titulo}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {essay.autor} · {formatFecha(essay.fecha)}
          </p>
          {essay.palabrasClave?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {essay.palabrasClave.map((palabra) => (
                <span
                  key={palabra}
                  className="rounded-full bg-paper-dim px-2 py-0.5 text-xs text-ink-soft"
                >
                  {palabra}
                </span>
              ))}
            </div>
          )}
        </div>

        {essay.archivoUrl && (
          <a
            href={essay.archivoUrl}
            download={essay.archivo}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-maroon px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent/20 transition hover:brightness-110"
          >
            Descargar documento
          </a>
        )}
      </div>

      {essay.resumen && <p className="mt-4 text-ink/80">{essay.resumen}</p>}

      <div className="mt-6">
        {!essay.archivoUrl && (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            No se encontró el archivo <code>{essay.archivo}</code> dentro de{' '}
            <code>src/essays/{essay.folder}/</code>. Verifica que el documento esté en esa
            carpeta.
          </p>
        )}
        {essay.archivoUrl && essay.tipo === 'pdf' && (
          <PdfViewer url={essay.archivoUrl} titulo={essay.titulo} />
        )}
        {essay.archivoUrl && essay.tipo === 'docx' && <DocxViewer url={essay.archivoUrl} />}
      </div>
    </div>
  )
}

import { ABOUT_TEXT } from '../content/about.js'

export default function About() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-2xl text-ink">Sobre esta página</h2>
      <div className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-ink/90">
        {ABOUT_TEXT}
      </div>
    </div>
  )
}

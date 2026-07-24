export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-ink-soft sm:px-6">
        Galería de Ensayos Universitarios — {new Date().getFullYear()}
      </div>
    </footer>
  )
}

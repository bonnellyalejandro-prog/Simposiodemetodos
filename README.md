# Galería de Ensayos Universitarios

React + Vite + Tailwind, sin base de datos. Los ensayos se leen directamente de archivos en el repo.

## Poner en marcha

Requiere Node.js (instala primero Homebrew + `brew install node` si no lo tienes).

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

## Estructura

- `src/essays/` — un ensayo por carpeta (`meta.json` + el `.pdf`/`.docx` original). Ver [src/essays/README.md](src/essays/README.md) para el esquema exacto.
- `src/lib/loadEssays.js` — descubre automáticamente todas las carpetas de `src/essays/` (no hay que registrar nada a mano).
- `src/pages/Gallery.jsx` — grilla de tarjetas con búsqueda y filtro por tema.
- `src/pages/EssayDetail.jsx` — vista de un ensayo: PDF paginado con `react-pdf`, Word convertido a HTML con `mammoth` y paginado con `pagedjs`, y botón de descarga del archivo original en ambos casos.

## Agregar más ensayos

1. Crea una carpeta en `src/essays/` por cada ensayo.
2. Copia ahí el `.docx`/`.pdf` original.
3. Escribe su `meta.json` (autor, tema, fecha, resumen, etc.) siguiendo el esquema documentado en `src/essays/README.md`.

// Descubre automáticamente cada ensayo dentro de src/essays/<carpeta>/meta.json
// y resuelve la URL del archivo (pdf/docx) que vive junto a ese meta.json.
const metaModules = import.meta.glob('../essays/*/meta.json', {
  eager: true,
  import: 'default',
})

const fileModules = import.meta.glob('../essays/*/*.{pdf,PDF,docx,DOCX}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function folderFromMetaPath(path) {
  // path con forma: '../essays/<carpeta>/meta.json'
  const parts = path.split('/')
  return parts[parts.length - 2]
}

function fileExtension(filename = '') {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

function resolveFileUrl(folder, filename) {
  const match = Object.entries(fileModules).find(([path]) =>
    path.endsWith(`/essays/${folder}/${filename}`),
  )
  return match ? match[1] : null
}

let cache = null

export function getAllEssays() {
  if (cache) return cache

  cache = Object.entries(metaModules)
    .map(([path, meta]) => {
      const folder = folderFromMetaPath(path)
      return {
        ...meta,
        folder,
        tipo: fileExtension(meta.archivo),
        archivoUrl: resolveFileUrl(folder, meta.archivo),
      }
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  return cache
}

export function getEssayById(id) {
  return getAllEssays().find((essay) => essay.id === id)
}

# Carpeta de ensayos

Cada ensayo vive en su propia subcarpeta dentro de `src/essays/`, con dos archivos:

1. **`meta.json`** — la metadata del ensayo.
2. **El documento original** — el `.pdf` o `.docx` tal cual, con el mismo nombre que indiques en `archivo`.

La galería y la vista de detalle se generan solas: no hace falta registrar el ensayo en ningún otro lado. Basta con crear la carpeta.

## Cómo agregar un ensayo nuevo

```
src/essays/
  mi-ensayo-slug/
    meta.json
    documento.pdf   (o documento.docx)
```

`mi-ensayo-slug` es libre (usa guiones, sin espacios ni tildes) — solo sirve para agrupar los dos archivos.

### Esquema de `meta.json`

```json
{
  "id": "mi-ensayo-slug",
  "titulo": "Título completo del ensayo",
  "autor": "Nombre Apellido",
  "tema": "Categoría o línea temática",
  "fecha": "2026-03-10",
  "resumen": "Uno o dos renglones que se muestran en la tarjeta de la galería.",
  "palabrasClave": ["palabra clave 1", "palabra clave 2"],
  "archivo": "documento.pdf"
}
```

- `id` debe ser único entre todos los ensayos (se usa en la URL `/ensayo/:id`) y por convención coincide con el nombre de la carpeta.
- `fecha` en formato `AAAA-MM-DD` para que el orden cronológico funcione bien.
- `archivo` es solo el nombre del archivo, sin ruta (debe estar en la misma carpeta que el `meta.json`).
- El tipo de visor (PDF embebido o conversión de Word) se detecta automáticamente por la extensión de `archivo`.

Los 27 ensayos de la cohorte ya están cargados aquí, uno por carpeta. Los archivos originales sin procesar (incluyendo duplicados docx/pdf descartados y documentos que no eran ensayos) quedaron intactos en `_ensayos-originales-sin-procesar/` en la raíz del proyecto, por si hace falta revisarlos.

`fecha`, `tema` y `resumen` de estos 27 fueron completados a partir del contenido de cada documento (o con un valor por defecto cuando no se encontró una fecha de entrega explícita); revísalos y ajústalos si tienes los datos exactos.

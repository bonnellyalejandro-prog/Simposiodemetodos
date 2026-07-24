// Paleta cálida y elegante: cada tema recibe un color estable a partir de su nombre,
// así la galería se ve dinámica sin depender de configuración manual por ensayo.
const PALETTE = [
  { bg: '#fdece1', text: '#9a4a1c' }, // terracota
  { bg: '#efe6fb', text: '#5b3aa0' }, // violeta
  { bg: '#e3f3ee', text: '#1f6f5c' }, // verde azulado
  { bg: '#fdf1d6', text: '#92650c' }, // mostaza
  { bg: '#fbe7ec', text: '#a3315a' }, // rosa antiguo
  { bg: '#e6edfb', text: '#3350a8' }, // azul cobalto
  { bg: '#eaf2df', text: '#4c7a1f' }, // verde bosque
  { bg: '#f4e6f0', text: '#8a3d74' }, // ciruela
]

export function colorForTema(tema = '') {
  let hash = 0
  for (let i = 0; i < tema.length; i += 1) {
    hash = (hash * 31 + tema.charCodeAt(i)) >>> 0
  }
  return PALETTE[hash % PALETTE.length]
}

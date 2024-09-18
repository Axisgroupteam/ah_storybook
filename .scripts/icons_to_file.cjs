const fs = require('fs')
const path = require('path')

// Ruta de la carpeta que contiene los SVG
const carpetaSvg = './src/assets/flowbite_icons'
// Ruta donde se guardará el archivo JavaScript
const rutaArchivoSalida = './src/components/data/icons.ts'

// Función para obtener los nombres de los SVG sin extensión
function obtenerNombresSvg(carpeta) {
  const archivos = fs.readdirSync(carpeta)
  return archivos
    .filter((archivo) => path.extname(archivo) === '.svg')
    .map((archivo) => path.basename(archivo, '.svg'))
}

// Función para crear el archivo JavaScript
function crearArchivoJs(ruta, nombresSvg) {
  const contenido = `export type iconsNames = "${nombresSvg.join('"|"')}";`
  fs.writeFileSync(ruta, contenido)
}

// Obtener los nombres de los SVG
const nombresSvg = obtenerNombresSvg(carpetaSvg)

// Crear el archivo JavaScript
crearArchivoJs(rutaArchivoSalida, nombresSvg)

console.log('Archivo JavaScript creado con éxito:', rutaArchivoSalida)

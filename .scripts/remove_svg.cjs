const fs = require('fs')
const { parseFromString } = require('dom-parser')

// Ruta de la carpeta que contiene los archivos SVG
const folderPath = './src/assets/flowbite_icons'

// Función para procesar un archivo SVG
function processSvgFile(filePath) {
  const file = fs.readFileSync(filePath, 'utf8')

  const regexW = / width="[^"]*"/g
  const regexH = / height="[^"]*"/g
  const regexFill = / fill="[^"]*"/g

  let newText = file.replace(regexW, '')
  newText = newText.replace(regexH, '')
  newText = newText.replace(regexFill, ' fill="currentColor"')

  fs.writeFile(filePath, newText, (err) => {
    if (err) throw err
    console.log(`Archivo ${filePath} procesado correctamente.`)
  })
}

// Obtener todos los archivos SVG en la carpeta
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith('.svg')) {
      const filePath = `${folderPath}/${file}`
      processSvgFile(filePath)
    }
  })
})

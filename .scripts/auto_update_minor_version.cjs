const fs = require('fs')
const semver = require('semver')

const packageJsonPath = './package.json'

// Leer el contenido del package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Obtener la versión actual y actualizar la menor
const currentVersion = packageJson.version
const newVersion = semver.inc(currentVersion, 'patch')

// Actualizar el package.json
packageJson.version = newVersion
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

console.log(`Versión actualizada a: ${newVersion}`)

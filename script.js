const fs = require('fs').promises

const sourceFile = './settings.ts'
const targetFiles = ['./packages/leaf-css/settings/global.ts', './apps/leaf-docs/settings/global.ts']

async function copyFiles() {
  const promises = targetFiles.map(async (targetFile) => {
    try {
      await fs.copyFile(sourceFile, targetFile)
      console.log(`File copied to ${targetFile}`)
    } catch (err) {
      console.log(`Error: Could not copy file to ${targetFile}`)
      console.error(err)
    }
  })

  await Promise.all(promises)
}

copyFiles()

const fs = require('fs').promises

const settingsSrcFile = './settings.ts'
const settingsTargetFiles = ['./packages/leaf-css/settings/global.ts', './apps/leaf-docs/settings/global.ts']

const typesSrcFile = './types.ts'
const typesTargetFiles = ['./packages/leaf-css/global-types.ts', './apps/leaf-docs/global-types.ts']

async function copyFiles(sourceFile, targetFiles) {
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

copyFiles(settingsSrcFile, settingsTargetFiles)
copyFiles(typesSrcFile, typesTargetFiles)

const fs = require('fs-extra')
const path = require('path')

const packagePath = path.resolve(__dirname, '..')
const buildPath = `${packagePath}/dist`
const commonFilesToCopy = ['package.json', 'LICENSE']

const run = async () => {
  try {
    await Promise.all([
      ...commonFilesToCopy.map((filePath) => fs.copy(`${packagePath}/${filePath}`, `${buildPath}/${filePath}`)),
    ])
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

run()

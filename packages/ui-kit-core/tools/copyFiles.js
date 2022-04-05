const fs = require('fs-extra')
const path = require('path')

const packagePath = path.resolve(__dirname, '..')
const buildPath = `${packagePath}/dist`

const generatePackageJson = async () => {
  const originalPackageJson = await fs.readJson(`${packagePath}/package.json`)

  const buildPackageJson = {
    ...originalPackageJson,
    module: './index.js',
    typings: './index.d.ts',
  }

  await fs.writeFile(`${buildPath}/package.json`, JSON.stringify(buildPackageJson, null, 2))
}

const run = async () => {
  try {
    await generatePackageJson()

    await fs.copy(`${packagePath}/LICENSE`, `${buildPath}/LICENSE`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

run()

const fs = require('fs-extra')
const path = require('path')

const packagePath = path.resolve(__dirname, '..')

const run = async () => {
  try {
    await fs.remove(`${packagePath}/dist`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

run()

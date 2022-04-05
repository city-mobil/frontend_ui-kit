#!/usr/bin/env node

import { execSync } from 'child_process'
import inquirer from 'inquirer'
import { checkHasPackageJSON, checkIsInLernaMonorepo, checkIsOnline, syncVersionWithRegistry } from './helpers'

const run = async (): Promise<void> => {
  const isOnline = await checkIsOnline()

  if (!isOnline) {
    console.log('Error, you are offline')

    process.exit(1)
  }

  const isLerna = checkIsInLernaMonorepo()
  const hasPackageJSON = checkHasPackageJSON()

  if (!isLerna && !hasPackageJSON) {
    console.log('Execute script from project root')

    process.exit(1)
  }

  const executor = isLerna ? 'npx lerna' : 'npm'

  const { bump } = await inquirer.prompt<{ bump: string }>([
    {
      type: 'input',
      message: 'Provide specific version or bump such as major, minor, prepatch, etc',
      name: 'bump',
    },
  ])

  try {
    syncVersionWithRegistry('alpha', isLerna)
  } catch (e) {
    process.exit(1)
  }

  execSync(`${executor} version ${bump} --preid alpha --force-publish --yes`, { stdio: 'inherit' })

  process.exit(0)
}

void run()

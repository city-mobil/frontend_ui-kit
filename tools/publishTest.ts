#!/usr/bin/env node

import { execSync } from 'child_process'
import { checkIsInLernaMonorepo, checkHasPackageJSON, syncVersionWithRegistry, checkIsOnline } from './helpers'

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

  try {
    syncVersionWithRegistry('test', isLerna)
  } catch (e) {
    process.exit(1)
  }

  execSync(`${executor} version prerelease --preid test --force-publish --yes`, { stdio: 'inherit' })
}

void run()

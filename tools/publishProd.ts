#!/usr/bin/env node

import {
  checkIsGitClean,
  getCurrentBranch,
  checkoutToMaster,
  gitStashPush,
  returnToInitialState,
  pullUpdates,
  BUMPS,
  checkIsInLernaMonorepo,
  checkHasPackageJSON,
} from './helpers'
import inquirer from 'inquirer'
import { execSync } from 'child_process'

async function run(): Promise<void | 1> {
  const isGitClean = checkIsGitClean()
  const currentBranch = getCurrentBranch()
  const isLerna = checkIsInLernaMonorepo()
  const hasPackageJSON = checkHasPackageJSON()

  if (!isLerna && !hasPackageJSON) {
    console.log('Execute script from project root')

    process.exit(1)
  }

  try {
    if (!isGitClean) {
      gitStashPush()
    }

    checkoutToMaster()
    pullUpdates()
  } catch (e) {
    returnToInitialState(isGitClean, currentBranch)

    process.exit(1)
  }

  const { bump } = await inquirer.prompt<{ bump: string }>([
    {
      type: 'list',
      message: 'Select bump',
      name: 'bump',
      choices: BUMPS,
    },
  ])

  const executor = isLerna ? 'npx lerna' : 'npm'

  execSync(`${executor} version ${bump} --force-publish --yes`, { stdio: 'inherit' })
  returnToInitialState(isGitClean, currentBranch)
}

void run()

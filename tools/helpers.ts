import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import dns from 'dns'

export interface ProjectJSON {
  version: string
}

export interface NpmViewJSON {
  'dist-tags': Record<string, string | undefined>
}

export const checkIsInLernaMonorepo = (): boolean => {
  const files = execSync('ls')

  return !!String(files)
    .split('\n')
    .find((fileName) => fileName === 'lerna.json')
}

export const checkHasPackageJSON = (): boolean => {
  const files = execSync('ls')

  return !!String(files)
    .split('\n')
    .find((fileName) => fileName === 'package.json')
}

// эта ф-ия нужна, тк npm view не кидает ошибки в оффлайне
export const checkIsOnline = async (): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve) => {
    dns.resolve('www.google.com', (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })

  const isOnline = await promise

  return isOnline
}

const getLastestDistTagVersion = (distTag = 'alpha'): string => {
  try {
    const npmViewRaw = execSync(`npm view @city/ui-kit dist-tags.${distTag}`)

    return String(npmViewRaw).replace('\n', '')
  } catch (e) {
    console.log('Error while getting latest version\n', e)
    throw e
  }
}

const readProjectFileAsJSON = (path: string): ProjectJSON => {
  try {
    const fileRaw = readFileSync(path)

    const fileParsed = JSON.parse(fileRaw.toString()) as ProjectJSON

    return fileParsed
  } catch (e) {
    console.log(`Error while reading file ${path}\n`, e)

    throw e
  }
}

export const syncVersionWithRegistry = (distTag: string, isLerna: boolean): void => {
  const filePath = isLerna ? './lerna.json' : './package.json'
  const fileParsed = readProjectFileAsJSON(filePath)
  const latestVersion = getLastestDistTagVersion(distTag)

  // проверка для первого запуска в проекте, когда по тегу distTag в регистри еще нет ни 1 публикации
  if (latestVersion) {
    fileParsed.version = latestVersion
  }

  try {
    writeFileSync(filePath, JSON.stringify(fileParsed, null, '  '))
  } catch (e) {
    console.log('Error while writing to file\n', e)

    throw e
  }
}

export const checkIsGitClean = (): boolean => {
  const res = execSync('git status --porcelain')

  return !String(res)
}

export const checkoutToBranch = (branch: string): void => {
  try {
    const command = `git checkout ${branch}`

    execSync(command)
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const checkoutToMaster = (): void => {
  checkoutToBranch('master')
}

export const getCurrentBranch = (): string => {
  const currentBranch = execSync('git branch --show-current')

  return String(currentBranch).replace('\n', '')
}

export const gitStashPush = (): void => {
  execSync('git stash push --include-untracked -m "deploy"')
}

export const gitStashPop = (): void => {
  execSync('git stash pop')
}

export const returnToInitialState = (isGitClean: boolean, currentBranch: string): void => {
  checkoutToBranch(currentBranch)

  if (!isGitClean) {
    gitStashPop()
  }
}

export const pullUpdates = (): void => {
  try {
    execSync('git pull')
  } catch (e) {
    console.error(e)

    throw e
  }
}

export const BUMPS = ['major', 'minor', 'patch']

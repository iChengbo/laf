import fse = require('fs-extra')
import path = require('path')
import { Constants } from '../constants'
import { execSync } from 'child_process'
import Config from '../config'
import { logger } from './logger'

/**
 * Create a internal package named '@' in node_modules, the package is used for loading typings in WebIDE。
 */
export function createCloudFunctionDeclarationPackage() {
  const source = path.resolve(__dirname, '../../dist')
  const target = path.resolve(__dirname, '../../node_modules/@')

  fse.ensureDirSync(target)
  fse.copySync(source, target)

  console.log(`copy success: ${source} => ${target}`)

  const packageJson = `
  {
    "name": "@",
    "version": "0.0.0"
  }
  `
  const pkgJsonPath = path.join(target, 'package.json')
  fse.writeFileSync(pkgJsonPath, packageJson)

  console.log(`write success: ${pkgJsonPath}`)
}

export function isCloudSdkPackageExists() {
  const target = path.resolve(__dirname, '../../../node_modules/@')
  const pkgJsonPath = path.join(target, 'package.json')
  return fse.existsSync(pkgJsonPath)
}

export function initCloudSdkPackage() {
  if (!isCloudSdkPackageExists()) {
    createCloudFunctionDeclarationPackage()
  }
}

/**
 * Install packages
 * @param packages
 * @returns
 */
export function installPackages() {
  const deps = process.env.DEPENDENCIES || ''
  if (!deps) {
    return
  }

  const flags = Config.NPM_INSTALL_FLAGS
  logger.info('run command: ', `npm install ${deps} ${flags}`)
  const r = execSync(`npm install ${deps} ${flags}`)
  console.log(r.toString())
}

/**
 * Check if node module exists
 * @param moduleName
 * @returns
 */
export function moduleExists(mod: string) {
  try {
    require.resolve(mod)
    return true
  } catch (_err) {
    return false
  }
}

/**
 * Create necessary indexes of collections
 * @param data
 * @returns
 */
export async function ensureCollectionIndexes(): Promise<any> {
  // init.ts should not import db globally, because init.ts would be referenced in build time
  const { DatabaseAgent } = require('../db')
  await DatabaseAgent.accessor.ready
  const db = DatabaseAgent.db
  await db.collection(Constants.function_log_collection).createIndexes([
    {
      key: { created_at: 1 },
      expireAfterSeconds: Config.FUNCTION_LOG_EXPIRED_TIME,
    },
  ])

  return true
}

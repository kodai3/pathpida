import fs from 'fs'
import loadNextConfig from 'next/dist/server/config'
import path from 'path'

export type Config = {
  input: string
  staticDir?: string
  output: string
  basepath?: string
}

export default async (
  enableStatic: boolean,
  outDir = 'lib',
  dir = process.cwd()
): Promise<Config> => {
  const config = loadNextConfig(require('next/constants').PHASE_PRODUCTION_BUILD, dir)
  // support for pages folder inside src.
  const srcDir = fs.existsSync(path.posix.join(dir, 'pages')) ? dir : path.posix.join(dir, 'src')

  const output = path.join(srcDir, outDir)

  if (!fs.existsSync(output)) fs.mkdirSync(output)

  return {
    input: path.posix.join(srcDir, 'pages'),
    staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
    output,
    basepath: config.basePath
  }
}

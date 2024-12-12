import { fileURLToPath } from 'node:url'
import { Project } from 'ts-morph'

export const createProject = (): Project =>
  new Project({
    tsConfigFilePath: fileURLToPath(import.meta.resolve('../tsconfig.json')),
    // これやらないと一気に全ファイル読み込んじゃってメモリが足りなくなる
    skipAddingFilesFromTsConfig: true,
  })

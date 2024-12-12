import assert from 'node:assert/strict'
import { createProject } from './project'

const project = createProject()

// 解析対象ファイルの読み込み
// コンポーネント単位で読み込むなど、工夫が必要
project.addSourceFilesAtPaths('./targetSources/**/*.ts')

assert(project.getSourceFiles().length === 4)

for (const sourceFile of project.getSourceFiles()) {
  // ファイルパスの取得
  console.log(sourceFile.getFilePath())

  // ファイル名の取得
  console.log(sourceFile.getBaseName())

  // ファイルごとのコンパイルエラーの取得
  console.log(sourceFile.getPreEmitDiagnostics())

  // ファイルごとの関数定義の取得(functionで定義されているもの)
  for (const functionDeclaration of sourceFile.getFunctions()) {
    console.log(functionDeclaration.getName())
  }

  // JSDocで@deprecatedがついているプロパティの取得
  for (const interfaceDeclaration of sourceFile.getInterfaces()) {
    for (const propertySignature of interfaceDeclaration.getProperties()) {
      for (const jsDoc of propertySignature.getJsDocs()) {
        if (jsDoc.getInnerText().startsWith('@deprecated')) {
          // TODO: `@deprecated`が付与されたプロパティを削除する処理
          // propertySignature.remove() でinterface宣言から削除はできるが、
          // そのプロパティが使用されているコード内から削除されることはないことに注意。

          for (const references of propertySignature.findReferences()) {
            // プロパティの使用箇所を取得
            for (const reference of references.getReferences()) {
              console.log(reference.getNode().getFullText())
            }
          }
        }
      }
    }
  }

  // ファイル内の変数宣言の取得
  for (const variableDeclaration of sourceFile.getVariableDeclarations()) {
    console.log(variableDeclaration.getName())
  }

  project.removeSourceFile(sourceFile)
}

assert(project.getSourceFiles().length === 0)

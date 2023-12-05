import { resolve } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import compilerSfc from '@vue/compiler-sfc'
import esprima from 'esprima'
import escodegen from 'escodegen'
import yargs from 'yargs'
import ts from 'typescript'

import { writeFileSyncRecursive } from './scripts/write-file-sync-recursive.js'

const argv = yargs(process.argv).argv
const path = resolve(`./src/components/${argv.component}.vue`)

const compile2js = (path2ts) => {
    const src = readFileSync(path2component)
    const jsSrc = ts.transpile(src, { target: 'es2015' })
}

const compile2ssr = (path2component) => {
    const src = readFileSync(path2component)
    const {
        descriptor: { script, template },
    } = compilerSfc.parse(src.toString())

    const jsSrc = ts.transpile(script.content, { target: 'es2015' })
    const parsed = esprima.parseModule(jsSrc)
    const cleanTemplate = template.content.replace(/(\r\n|\n|\r)/gm, '').replaceAll('    ', '')

    parsed.body.forEach((node) => {
        // process imports
        if (node.type === 'ImportDeclaration') {
            const isLocalFile = node.source.value.startsWith('@')
            const isVueComponent = node.source.value.endsWith('.vue')

            if (isLocalFile && isVueComponent) {
                const path = node.source.value.replace('@', './src')
                compile2ssr(resolve(path))
            }

            if (isLocalFile) {
                node.source.value = node.source.value.replace('@', '#ssr')
            }

            if (isVueComponent) {
                node.source.value = node.source.value.replace('.vue', '.js')
            }
        }

        // process template
        if (node.type === 'ExportDefaultDeclaration') {
            node.declaration.arguments[0].properties.push({
                type: 'Property',
                key: { type: 'Identifier', name: 'template' },
                value: { type: 'Literal', value: cleanTemplate },
            })
        }
    })

    const code = escodegen.generate(parsed)
    const path2ssrComponent = path2component.replace('src', 'ssr').replace('.vue', '.js')

    writeFileSyncRecursive(path2ssrComponent, code)
}

compile2ssr(path)

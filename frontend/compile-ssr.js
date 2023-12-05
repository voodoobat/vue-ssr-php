import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import compilerSfc from '@vue/compiler-sfc'
import esprima from 'esprima'
import escodegen from 'escodegen'
import yargs from 'yargs'

const argv = yargs(process.argv).argv
const path = resolve(`./src/components/${argv.component}.vue`)

const compile2ssr = (path2component) => {
    console.log('Compile...')
    const src = readFileSync(path2component)
    const {
        descriptor: { script, template },
    } = compilerSfc.parse(src.toString())

    const parsed = esprima.parseModule(script.content)
    const cleanTemplate = template.content.replace(/(\r\n|\n|\r)/gm, '').replaceAll('    ', '')

    parsed.body.forEach((node) => {
        // process imports
        if (node.type === 'ImportDeclaration') {
            const isLocalFile = node.source.value.startsWith('@')
            const isVueComponent = node.source.value.endsWith('.vue')

            if (isLocalFile && isVueComponent) {
                const path = node.source.value.replace('@', './src')
                compile2ssr(path)
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

    writeFileSync(path2component.replace('./src', './ssr').replace('.vue', '.js'), code, {
        recursive: true,
    })
}

compile2ssr(path)

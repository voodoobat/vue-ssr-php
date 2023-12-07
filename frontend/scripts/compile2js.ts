import { readFileSync } from 'fs'
import { parse } from '@vue/compiler-sfc'
import { ScriptTarget, transpile } from 'typescript'
import { Program, parseModule } from 'esprima'
import { generate } from 'escodegen'
import { writeFileSyncRecursive } from './write-file-sync-recursive'

const processImports = (program: Program) => {
    program.body.forEach((node) => {
        if (node.type === 'ImportDeclaration' && node.source.value) {
            const value = node.source.value as string

            if (value.startsWith('@')) {
                node.source.value = value.replace('@', '#ssr').replace('.vue', '.js')

                if (!value.endsWith('.vue')) {
                    compile2js(`${value.replace('@', './src')}.ts`)
                } else {
                    compile2js(value.replace('@', './src'))
                }
            }
        }
    })
}

const processDefineComponent = (program: Program, template: string) => {
    program.body.forEach((node) => {
        if (node.type == 'ExportDefaultDeclaration') {
            // is defineComponent function
            if (
                node.declaration.type === 'CallExpression' &&
                node.declaration.callee.type === 'Identifier' &&
                node.declaration.callee.name === 'defineComponent'
            ) {
                // if defineComponent argument is object
                if (node.declaration.arguments[0].type === 'ObjectExpression') {
                    // add template property
                    node.declaration.arguments[0].properties.push({
                        type: 'Property',
                        key: { type: 'Identifier', name: 'template' },
                        computed: false,
                        value: { type: 'Literal', value: template },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                    })
                }
            }
        }
    })
}

export const compile2js = (path: string) => {
    const source = readFileSync(path)
    const isComponent = path.endsWith('.vue')

    if (isComponent) {
        const component = parse(source.toString()).descriptor

        const script = component.script ? component.script.content : ''
        const javascript = transpile(script, { target: ScriptTarget.ES2015 })
        const program = parseModule(javascript)

        const template = component.template ? component.template.content : ''
        const cleanTemplate = template.replace(/(\r\n|\n|\r)/gm, '').replaceAll('    ', '')

        processImports(program)
        processDefineComponent(program, cleanTemplate)

        const code = generate(program)
        const path2save = path.replace('./src', './ssr').replace('.vue', '.js')

        writeFileSyncRecursive(path2save, code)
    } else {
        const javascript = transpile(source.toString(), { target: ScriptTarget.ES2015 })
        const program = parseModule(javascript)

        processImports(program)

        const code = generate(program)
        const path2save = path.replace('./src', './ssr').replace('.ts', '.js')

        writeFileSyncRecursive(path2save, code)
    }
}

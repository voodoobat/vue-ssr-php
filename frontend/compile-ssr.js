import { readFileSync, writeFileSync } from 'fs'
import compilerSfc from '@vue/compiler-sfc'
import esprima from 'esprima'
import escodegen from 'escodegen'
import yargs from 'yargs'

const argv = yargs(process.argv).argv

const src = readFileSync(`./src/components/${argv.component}.vue`)
const {
    descriptor: { script, template },
} = compilerSfc.parse(src.toString())

const parsed = esprima.parseModule(script.content)
const cleanTemplate = template.content.replace(/(\r\n|\n|\r)/gm, '').replaceAll('    ', '')

parsed.body.forEach((node) => {
    if (node.type === 'ImportDeclaration') {
        console.log(node)
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

const component = script.content

writeFileSync(`./ssr/components/${argv.component}.js`, code, { recursive: true })

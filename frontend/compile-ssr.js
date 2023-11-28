import { readFileSync, writeFileSync } from 'fs'
import { parse } from '@vue/compiler-sfc'
import yargs from 'yargs'

const argv = yargs(process.argv).argv

const src = readFileSync(`./src/components/${argv.component}.vue`)
const {
    descriptor: { script, template },
} = parse(src.toString())

const component = script.content
    .replace('// @@template', `template: \`${template.content}\`,`)
    .replaceAll('.vue', '.js')

writeFileSync(`./ssr/components/${argv.component}.js`, component, { recursive: true })

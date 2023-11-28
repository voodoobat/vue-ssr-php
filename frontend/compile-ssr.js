import { readFileSync, writeFileSync } from 'fs'
import { parse } from '@vue/compiler-sfc'

const src = readFileSync('./src/components/Greeting.vue')
const {
    descriptor: { script, template },
} = parse(src.toString())

const component = script.content.replace('// @@template', `template: \`${template.content}\`,`)

writeFileSync('./ssr/components/Greeting.js', component)

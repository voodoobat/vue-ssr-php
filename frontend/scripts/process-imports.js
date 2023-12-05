import { parseModule } from 'esprima'

const processImports = (source) => {
    const parsed = parseModule(source)
    parsed.body.forEach((node) => {
        if (node.type === 'ImportDeclaration') {
            const isLocalFile = node.source.value.startsWith('@')
            const isVueComponent = node.source.value.endsWith('.vue')
        }
    })
}

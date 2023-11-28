import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import yargs from 'yargs'

const argv = yargs(process.argv).argv

const Component = await import(`./ssr/components/${argv.component}.js`)
const app = createSSRApp({
    components: { Component: Component.default },
    data: () => ({
        props: argv.data ? JSON.parse(argv.data) : {},
    }),
    template: `<Component v-bind="props" />`,
})

renderToString(app).then(console.log)

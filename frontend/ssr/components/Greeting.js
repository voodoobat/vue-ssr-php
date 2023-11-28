
import { defineComponent } from 'vue'

export default defineComponent({
    template: `
    <h1>{{ message }}</h1>
`,
    name: 'Greeting',
    props: {
        message: {
            type: String,
            default: 'Hello, world',
        },
    },
})

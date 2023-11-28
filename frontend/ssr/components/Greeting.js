
import { defineComponent } from 'vue'
import BaseButton from './base/BaseButton.js'

export default defineComponent({
    template: `
    <h1>{{ message }}</h1>
    <BaseButton @click="sayHello">Click me!</BaseButton>
`,
    name: 'Greeting',
    components: {
        BaseButton,
    },
    props: {
        message: {
            type: String,
            default: 'Hello, world',
        },
    },
    setup() {
        const sayHello = () => alert('Hello!')

        return {
            sayHello,
        }
    }
})

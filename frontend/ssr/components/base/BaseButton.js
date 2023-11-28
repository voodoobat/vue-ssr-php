
import { defineComponent } from 'vue'

export default defineComponent({
    template: `
    <button type="button">
        <slot />
    </button>
`,
    name: 'BaseButton',
})

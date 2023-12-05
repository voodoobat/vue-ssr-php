import {
    computed,
    defineComponent,
    ref
} from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
export default defineComponent({
    name: 'Greeting',
    components: { BaseButton },
    props: {
        message: {
            type: String,
            default: ''
        },
        initialClickCount: {
            type: Number,
            default: 0
        }
    },
    setup({initialClickCount}) {
        const clickCount = ref(initialClickCount);
        const clickCountMessage = computed(() => {
            if (clickCount.value < 1) {
                return 'no clicks';
            }
            return `${ clickCount.value } clicks`;
        });
        return {
            clickCount,
            clickCountMessage
        };
    },
    template: '<h1>{{ message }}</h1><p>{{ clickCountMessage }}</p><BaseButton @click="clickCount++">Click me!</BaseButton>'
});
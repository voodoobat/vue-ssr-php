<template>
    <h1>{{ message }}</h1>
    <p>{{ clickCountMessage }}</p>
    <BaseButton @click="incrementCount">Click me!</BaseButton>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { increment } from '@/helpers/increment'

export default defineComponent({
    name: 'Greeting',
    components: {
        BaseButton,
    },
    props: {
        message: {
            type: String,
            default: '',
        },
        initialClickCount: {
            type: Number,
            default: 0,
        },
    },
    setup({ initialClickCount }) {
        const clickCount = ref(initialClickCount)
        const clickCountMessage = computed(() => {
            if (clickCount.value < 1) {
                return 'no clicks'
            }

            return `${clickCount.value} clicks`
        })

        const incrementCount = () => {
            clickCount.value = increment(clickCount.value)
        }

        return {
            clickCount,
            clickCountMessage,
            incrementCount,
        }
    },
})
</script>

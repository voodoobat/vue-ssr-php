<template>
    <h1>{{ message }}</h1>
    <BaseButton @click="sayHello">Click me!</BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from './base/BaseButton.vue'

export default defineComponent({
    // @@template
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
</script>

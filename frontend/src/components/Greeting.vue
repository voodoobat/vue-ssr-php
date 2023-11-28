<template>
    <h1>{{ message }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // @@template
    name: 'Greeting',
    props: {
        message: {
            type: String,
            default: 'Hello, world',
        },
    },
})
</script>

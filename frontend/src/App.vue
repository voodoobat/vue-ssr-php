<template>
    <Greeting :message="message" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Greeting from '@/components/Greeting.vue'

const message = ref('')
onMounted(async () => {
    const request = await fetch('/data')
    const json = await request.json()

    message.value = json.message
})
</script>

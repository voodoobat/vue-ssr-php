<template>
    <Greeting :message="greeting" />
</template>

<script setup lang="ts">
import Greeting from './components/Greeting.vue'

const greeting = 'Hello from client'
</script>

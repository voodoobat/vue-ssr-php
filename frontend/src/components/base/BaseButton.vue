<template>
    <button type="button">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // @@template
    name: 'BaseButton',
})
</script>

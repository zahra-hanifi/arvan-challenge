<template>
  <svg
    :width="props.icon"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="props.icon" />
  </svg>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 24,
  },
})
</script>

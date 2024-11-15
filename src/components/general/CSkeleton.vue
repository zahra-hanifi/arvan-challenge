<template>
  <div class="animate-pulse bg-grey-400"></div>
</template>
<script>
export default {
  name: 'CSkeleton',
}
</script>
<style scoped>
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

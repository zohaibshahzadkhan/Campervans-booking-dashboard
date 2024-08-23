<template>
  <div
    class="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin-custom sm:h-16 sm:w-16 sm:border-6 md:h-20 md:w-20 md:border-8"
  ></div>
</template>

<style scoped>
@keyframes spin-custom {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-custom {
  animation: spin-custom 1s linear infinite;
}
</style>

<template>
  <div class="flex justify-center gap-2 mt-4">
    <button
      @click="previousWeek"
      class="w-24 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    >
      Previous
    </button>
    <button
      @click="nextWeek"
      class="w-24 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['previousWeek', 'nextWeek']);

function previousWeek() {
  emit('previousWeek');
}

function nextWeek() {
  emit('nextWeek');
}
</script>

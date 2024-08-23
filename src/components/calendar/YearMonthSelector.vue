<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:gap-2 sm:items-center mb-6">
    <div class="relative h-10 w-full sm:w-72 min-w-[200px]">
      <select
        :value="modelValueYear"
        @change="emitYearChange($event.target.value)"
        class="peer h-full w-full rounded-[7px] border border-gray-300 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline-0 transition-all focus:border-2 focus:border-gray-900 focus:outline-0"
      >
        <option disabled value="">Select Year</option>
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="relative h-10 w-full sm:w-72 min-w-[200px]">
      <select
        :value="modelValueMonth"
        @change="emitMonthChange($event.target.value)"
        class="peer h-full w-full rounded-[7px] border border-gray-300 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline-0 transition-all focus:border-2 focus:border-gray-900 focus:outline-0"
      >
        <option disabled value="">Select Month</option>
        <option v-for="(month, index) in months" :key="index" :value="index">
          {{ month }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import { useStationStore } from '@src/stores/stationStore';

const stationStore = useStationStore();

defineProps({
  modelValueYear: Number,
  modelValueMonth: Number,
  availableYears: Array,
  months: Array,
});

onMounted(() => {
  if (stationStore.selectedYear !== null) {
    emit('update:modelValueYear', stationStore.selectedYear);
  }
  if (stationStore.selectedMonth !== null) {
    emit('update:modelValueMonth', stationStore.selectedMonth);
  }
});

const emit = defineEmits(['update:modelValueYear', 'update:modelValueMonth']);

function emitYearChange(value) {
  const year = Number(value);
  emit('update:modelValueYear', year);
  stationStore.setYear(value);
}

function emitMonthChange(value) {
  const month = Number(value);
  emit('update:modelValueMonth', month);
  stationStore.setMonth(value);
}
</script>

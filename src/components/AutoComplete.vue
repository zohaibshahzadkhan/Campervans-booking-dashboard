<template>
  <div class="relative">
    <vue3-select
      data-testid="station-select"
      v-model="currentStation"
      :options="stations"
      label="name"
      :getOptionLabel="(station) => station.name"
      placeholder="Search station..."
      class="w-full"
      :clearable="false"
      @update:modelValue="handleSelection"
      aria-label="Station selection"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { useStationStore } from '@src/stores/stationStore';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['select']);
const stationStore = useStationStore();
const currentStation = ref(null);
const { selectedStation, stations } = storeToRefs(stationStore);

onMounted(async () => {
  try {
    if (stations.value.length === 0) {
      await stationStore.fetchStations();
    }
    if (selectedStation) {
      currentStation.value = selectedStation.value;
    }
  } catch (error) {
    console.error('Error fetching stations:', error);
  }
});

const handleSelection = (station) => {
  if (station) {
    currentStation.value = station;
    selectedStation.value = station;
    emit('select', station);
  }
};
</script>

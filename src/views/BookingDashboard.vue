<template>
  <div class="flex flex-col items-center mt-10 min-h-screen p-4">
    <AutoComplete
      @select="onStationSelect"
      class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
    />
    <div v-if="stationStore.error" class="mt-4 text-red-500">
      {{ stationStore.error }}
    </div>
    <BookingCalendar
      v-if="
        stationStore.selectedStation &&
        !stationStore.loading &&
        !stationStore.error
      "
      class="mt-20 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl"
    />
  </div>
</template>

<script setup>
import { useStationStore } from '@src/stores/stationStore';
import AutoComplete from '@src/components/AutoComplete.vue';
import BookingCalendar from '@src/components/calendar/BookingCalendar.vue';

const stationStore = useStationStore();

// const selectedStation = computed(() => stationStore.selectedStation);

const onStationSelect = async (station) => {
  stationStore.setSelectedStation(station);
};
</script>

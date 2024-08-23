<template>
  <div class="flex justify-center items-center min-h-96 p-4">
    <div v-if="stationStore.loading" class="flex justify-center items-center">
      <Spinner data-testid="loading-spinner" />
    </div>
    <div v-else-if="stationStore.error" class="text-center text-red-500">
      <p>{{ stationStore.error }}</p>
    </div>
    <div
      data-testid="booking-details"
      v-else-if="booking"
      class="bg-white p-4 border rounded shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
    >
      <h2 class="text-xl font-bold mb-4">Booking Details</h2>
      <p data-testid="customer-name">
        <strong>Customer Name:</strong> {{ booking.customerName }}
      </p>
      <p data-testid="start-date">
        <strong>Booking Start Date:</strong>
        {{ booking.startDate.split('T')[0] }}
      </p>
      <p data-testid="end-date">
        <strong>Booking End Date:</strong> {{ booking.endDate.split('T')[0] }}
      </p>
      <p data-testid="duration">
        <strong>Booking Duration:</strong> {{ bookingDuration }}
      </p>
      <p>
        <strong data-testid="station-name"
          >Pickup / Return Station Name:</strong
        >
        {{ pickupReturnStationName }}
      </p>
      <div class="flex justify-center mt-4">
        <button
          data-testid="back-button"
          @click="goBack"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Calendar
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Booking not found.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStationStore } from '@src/stores/stationStore';
import Spinner from '@src/components/LoadingSpinner.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const stationStore = useStationStore();

const { booking } = storeToRefs(stationStore);

const bookingId = route.params.bookingId;
const stationId = route.params.stationId;

const bookingDuration = computed(() => {
  if (!booking.value) return '';
  const start = new Date(booking.value.startDate);
  const end = new Date(booking.value.endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + ' days';
  return duration;
});

const pickupReturnStationName = computed(() => {
  const station = stationStore.stations.find(
    (station) => station.id === booking.value?.pickupReturnStationId,
  );
  return station ? station.name : 'Unknown';
});

onMounted(async () => {
  await stationStore.fetchStations();
  await stationStore.fetchBooking(stationId, bookingId);
});

function goBack() {
  router.push('/');
}
</script>

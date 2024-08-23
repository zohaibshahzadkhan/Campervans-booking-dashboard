<template>
  <div
    class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
  >
    <div
      v-for="(day, index) in weekDays"
      :key="index"
      class="p-4 border rounded bg-gray-100"
    >
      <div class="font-bold mb-2">{{ day.format('ddd, DD MMM') }}</div>
      <div v-if="bookingsForDay(day).length" class="space-y-2">
        <div
          v-for="booking in bookingsForDay(day)"
          :key="booking.id"
          :class="bookingClass(booking)"
          @click="viewBookingDetail(booking)"
        >
          <span>{{ booking.customerName }}</span>
        </div>
      </div>
      <div v-else class="text-gray-500">No Bookings</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  weekDays: Array,
  bookingsForDay: Function,
  bookingClass: Function,
  viewBookingDetail: Function,
});
</script>

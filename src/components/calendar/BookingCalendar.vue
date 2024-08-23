<template>
  <div>
    <YearMonthSelector
      :modelValueYear="Number(selectedYear)"
      :modelValueMonth="Number(selectedMonth)"
      :availableYears="availableYears"
      :months="months"
      @update:modelValueYear="updateYear"
      @update:modelValueMonth="updateMonth"
    />

    <BookingGrid
      :weekDays="weekDays"
      :bookingsForDay="bookingsForDay"
      :bookingClass="bookingClass"
      :viewBookingDetail="viewBookingDetail"
    />

    <NavigationButtons @previousWeek="previousWeek" @nextWeek="nextWeek" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import YearMonthSelector from './YearMonthSelector.vue';
import BookingGrid from './BookingGrid.vue';
import NavigationButtons from './NavigationButtons.vue';
import { useRouter } from 'vue-router';
import { useStationStore } from '@src/stores/stationStore';

const stationStore = useStationStore();
const router = useRouter();

const currentDate = ref(dayjs());
const selectedYear = ref(currentDate.value.year());
const selectedMonth = ref(currentDate.value.month());

const availableYears = computed(() => {
  const currentYear = dayjs().year();
  return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = computed(() => {
  const startOfWeek = currentDate.value.startOf('week');
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
});

function updateYear(year) {
  selectedYear.value = year;
  changeYearOrMonth();
}

function updateMonth(month) {
  selectedMonth.value = month;
  changeYearOrMonth();
}

function nextWeek() {
  currentDate.value = currentDate.value.add(1, 'week');
}

function previousWeek() {
  currentDate.value = currentDate.value.subtract(1, 'week');
}

function changeYearOrMonth() {
  currentDate.value = currentDate.value
    .year(selectedYear.value)
    .month(selectedMonth.value);
}

function bookingsForDay(day) {
  return stationStore.bookings.filter(
    (booking) =>
      day.isSame(booking.startDate, 'day') ||
      day.isSame(booking.endDate, 'day'),
  );
}

function bookingClass(booking) {
  if (dayjs(booking.startDate).isSame(dayjs(booking.endDate), 'day')) {
    return 'p-2 rounded bg-yellow-200';
  }
  return booking.startDate === dayjs().format('YYYY-MM-DD')
    ? 'p-2 rounded bg-blue-200'
    : 'p-2 rounded bg-green-200';
}

function viewBookingDetail(booking) {
  router.push({
    name: 'BookingDetail',
    params: {
      stationId: stationStore.selectedStation.id,
      bookingId: booking.id,
    },
  });
}
</script>

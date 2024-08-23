import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@src/api/apiDefaults';

export const useStationStore = defineStore('stationStore', () => {
  const stations = ref([]);
  const bookings = ref([]);
  const booking = ref(null);
  const selectedStation = ref(null);
  const selectedYear = ref(null);
  const selectedMonth = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const setSelectedStation = (station) => {
    selectedStation.value = station;
    setStationBookings();
  };

  const fetchStations = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/stations');
      stations.value = response.data;
    } catch (err) {
      console.error('Error fetching stations:', err);
      error.value = 'Failed to load stations.';
    } finally {
      loading.value = false;
    }
  };

  const setStationBookings = () => {
    bookings.value = selectedStation.value
      ? selectedStation.value.bookings
      : [];
  };

  const setYear = (year) => {
    selectedYear.value = year;
  };

  const setMonth = (month) => {
    selectedMonth.value = month;
  };

  return {
    stations,
    bookings,
    booking,
    selectedStation,
    selectedMonth,
    selectedYear,
    loading,
    error,
    fetchStations,
    setSelectedStation,
    setStationBookings,
    setYear,
    setMonth,
  };
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useStationStore } from '@src/stores/stationStore';
import api from '@src/api/apiDefaults';

vi.mock('@src/api/apiDefaults', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Station Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useStationStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have the correct initial state', () => {
    expect(store.stations).toEqual([]);
    expect(store.bookings).toEqual([]);
    expect(store.booking).toBeNull();
    expect(store.selectedStation).toBeNull();
    expect(store.selectedYear).toBeNull();
    expect(store.selectedMonth).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('fetchStations should update state on success', async () => {
    const mockStations = [{ id: 1, name: 'Station 1' }, { id: 2, name: 'Station 2' }];
    api.get.mockResolvedValueOnce({ data: mockStations });

    await store.fetchStations();

    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.stations).toEqual(mockStations);
  });

  it('fetchStations should handle errors', async () => {
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    await store.fetchStations();

    expect(store.loading).toBe(false);
    expect(store.error).toBe('Failed to load stations.');
    expect(store.stations).toEqual([]);
  });

  it('fetchBooking should update state on success', async () => {
    const mockBooking = { id: 1, name: 'Booking 1' };
    api.get.mockResolvedValueOnce({ data: mockBooking });

    await store.fetchBooking(1, 1);

    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.booking).toEqual(mockBooking);
  });

  it('fetchBooking should handle errors', async () => {
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    await store.fetchBooking(1, 1);

    expect(store.loading).toBe(false);
    expect(store.error).toBe('Failed to load booking details.');
    expect(store.booking).toBeNull();
  });

  it('setSelectedStation should update the selected station and bookings', () => {
    const mockStation = {
      id: 1,
      name: 'Station 1',
      bookings: [{ id: 1, name: 'Booking 1' }, { id: 2, name: 'Booking 2' }]
    };

    store.setSelectedStation(mockStation);

    expect(store.selectedStation).toEqual(mockStation);
    expect(store.bookings).toEqual(mockStation.bookings);
  });

  it('setSelectedStation with null should clear bookings', () => {
    store.setSelectedStation(null);

    expect(store.selectedStation).toBeNull();
    expect(store.bookings).toEqual([]);
  });

  it('setYear should update the selected year', () => {
    store.setYear(2024);
    expect(store.selectedYear).toBe(2024);
  });

  it('setMonth should update the selected month', () => {
    store.setMonth(8);
    expect(store.selectedMonth).toBe(8);
  });
});

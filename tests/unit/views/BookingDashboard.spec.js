import { render, screen, waitFor } from '@testing-library/vue';
import BookingDashboard from '@src/views/BookingDashboard.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStationStore } from '@src/stores/stationStore';

const TEST_ID_STATION_SELECT = 'station-select';
const TEST_ID_ERROR_MESSAGE = 'error-message';
const TEST_ID_BOOKING_CALENDAR = 'booking-calendar';
const ERROR_MESSAGE = 'An error occurred';

describe('BookingDashboard', () => {
  let pinia;
  let stationStore;

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        stationStore: {
          selectedStation: null,
          loading: false,
          error: null,
        },
      },
    });

    stationStore = useStationStore();
  });

  describe('Component Rendering', () => {
    it('renders AutoComplete component', () => {
      // Arrange
      render(BookingDashboard, { global: { plugins: [pinia] } });
      
      // Act
      const autoComplete = screen.getByTestId(TEST_ID_STATION_SELECT);
      
      // Assert
      expect(autoComplete).toBeDefined();
    });

    it('renders BookingCalendar when a station is selected and there is no error', async () => {
      // Arrange
      stationStore.selectedStation = { name: 'Station 1' };
      stationStore.loading = false;
      stationStore.error = null;

      render(BookingDashboard, {
        global: { plugins: [pinia] },
      });

      // Act & Assert
      await waitFor(() => {
        const bookingCalendar = screen.getByTestId(TEST_ID_BOOKING_CALENDAR);
        expect(bookingCalendar).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when stationStore.error is set', async () => {
      // Arrange
      stationStore.error = ERROR_MESSAGE;

      render(BookingDashboard, {
        global: { plugins: [pinia] },
      });

      // Act & Assert
      await waitFor(() => {
        const errorMessage = screen.getByTestId(TEST_ID_ERROR_MESSAGE);
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent(ERROR_MESSAGE);
      });
    });

    it('does not render BookingCalendar when there is an error', () => {
      // Arrange
      stationStore.selectedStation = { name: 'Station 1' };
      stationStore.loading = false;
      stationStore.error = ERROR_MESSAGE;

      render(BookingDashboard, {
        global: { plugins: [pinia] },
      });

      // Act
      const bookingCalendar = screen.queryByTestId(TEST_ID_BOOKING_CALENDAR);

      // Assert
      expect(bookingCalendar).toBeNull();
    });
  });

  describe('Loading State', () => {
    it('does not render BookingCalendar when loading', async () => {
      // Arrange
      stationStore.selectedStation = { name: 'Station 1' };
      stationStore.loading = true;
      stationStore.error = null;

      render(BookingDashboard, {
        global: { plugins: [pinia] },
      });

      // Act & Assert
      await waitFor(() => {
        const bookingCalendar = screen.queryByTestId(TEST_ID_BOOKING_CALENDAR);
        expect(bookingCalendar).toBeNull();
      });
    });
  });
});

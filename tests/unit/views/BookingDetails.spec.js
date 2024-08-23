import { render, screen, waitFor, fireEvent } from '@testing-library/vue';
import { describe, it, expect, beforeEach } from 'vitest';
import BookingDetail from '@src/views/BookingDetail.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStationStore } from '@src/stores/stationStore';
import { useRoute, useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));


const TEST_ID_SPINNER = 'loading-spinner';
const TEST_ID_BOOKING_DETAILS = 'booking-details';
const TEST_ID_BACK_BUTTON = 'back-button';
const TEST_ID_CUSTOMER_NAME = 'customer-name'
const TEST_ID_DURATION = 'duration'
const TEST_ID_START_DATE = 'start-date'
const TEST_ID_END_DATE = 'end-date'
const TEST_ID_STATION_NAME = 'station-name'

describe('BookingDetail', () => {
  let pinia;
  let stationStore;
  let routeMock;
  let routerMock;

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        stationStore: {
          booking: null,
          stations: [],
          loading: false,
          error: null,
        },
      },
    });

    stationStore = useStationStore();
    
    routeMock = {
      params: {
        bookingId: '123',
        stationId: '456',
      },
    };

    routerMock = {
      push: vi.fn(),
    };

    useRoute.mockReturnValue(routeMock);
    useRouter.mockReturnValue(routerMock);
  });

  it('displays a spinner when loading', () => {
    // Arrange
    stationStore.loading = true;

    render(BookingDetail, { global: { plugins: [pinia] } });

    // Act
    const spinner = screen.getByTestId(TEST_ID_SPINNER);

    // Assert
    expect(spinner).toBeInTheDocument();
  });

  it('displays an error message when stationStore.error is set', async () => {
    // Arrange
    stationStore.error = 'An error occurred';

    render(BookingDetail, {
      global: { plugins: [pinia] },
    });

    // Act & Assert
    await waitFor(() => {
      const errorMessage = screen.getByText('An error occurred');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('displays booking details when a booking is present', async () => {
    // Arrange
    stationStore.booking = {
      customerName: 'John Doe',
      startDate: '2024-08-20T10:00:00Z',
      endDate: '2024-08-22T10:00:00Z',
      pickupReturnStationId: 'station123',
    };
    stationStore.stations = [{ id: 'station123', name: 'Station 1' }];
    stationStore.loading = false;
    stationStore.error = null;

    render(BookingDetail, {
      global: { plugins: [pinia] },
    });

    // Act & Assert
    await waitFor(() => {
      const bookingDetails = screen.getByTestId(TEST_ID_BOOKING_DETAILS);
      expect(bookingDetails).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_DURATION)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_CUSTOMER_NAME)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_START_DATE)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_END_DATE)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_STATION_NAME)).toBeInTheDocument();
    });
  });

  it('displays "Booking not found" when there is no booking', () => {
    // Arrange
    stationStore.booking = null;

    render(BookingDetail, { global: { plugins: [pinia] } });

    // Act
    const notFoundMessage = screen.getByText('Booking not found.');

    // Assert
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('navigates back to the calendar when "Back to Calendar" button is clicked', async () => {
    // Arrange
    stationStore.booking = {
      customerName: 'John Doe',
      startDate: '2024-08-20T10:00:00Z',
      endDate: '2024-08-22T10:00:00Z',
      pickupReturnStationId: 'station123',
    };

    render(BookingDetail, {
      global: { plugins: [pinia] },
    });

    // Act
    const backButton = screen.getByTestId(TEST_ID_BACK_BUTTON);
    await fireEvent.click(backButton);

    // Assert
    expect(routerMock.push).toHaveBeenCalledWith('/');
  });
});

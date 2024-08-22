import { createRouter, createWebHistory } from 'vue-router';
import BookingDetail from '@src/views/BookingDetail.vue';
import BookingDashboard from '@src/views/BookingDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'BookingDashboard',
    component: BookingDashboard,
  },
  {
    path: '/booking/:stationId/:bookingId',
    name: 'BookingDetail',
    component: BookingDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

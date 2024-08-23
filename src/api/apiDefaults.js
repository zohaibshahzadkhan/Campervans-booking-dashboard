import axios from 'axios';

const api = axios.create({
  baseURL: 'https://605c94c36d85de00170da8b4.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

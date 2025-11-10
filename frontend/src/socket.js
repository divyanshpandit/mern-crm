import { io } from 'socket.io-client';

// The VITE_API_URL is the full base URL for the API, e.g., http://localhost:5000/api
// The socket needs to connect to the base server URL, so we strip off the /api part.
const URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export const socket = io(URL, {
  autoConnect: false,
});
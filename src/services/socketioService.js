import { io } from 'socket.io-client';
import { WEBSOCKET_URL } from '../lib/config';

export const socket = io(WEBSOCKET_URL, {
    autoConnect: false
  });
import { END, eventChannel } from 'redux-saga';
import { BASE_URL_WS } from '../utils/consts/api';

export function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(BASE_URL_WS);

    socket.onopen = function () {
      resolve(socket);
    };

    socket.onerror = function (evt) {
      reject(evt);
    };
  });
}

export function createSocketChannel(socket: WebSocket) {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      emit(event.data);
    };

    socket.onclose = () => {
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    return unsubscribe;
  });
}

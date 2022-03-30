import { PayloadAction } from '@reduxjs/toolkit';
import { EventChannel, SagaIterator, Task } from 'redux-saga';
import { call, cancel, cancelled, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { createSocketChannel, createWebSocketConnection } from '../../api/WebSocketApi';
import { wsActions } from '../../utils/consts/ws.actions.consts';
import { roomsAction } from '../actions/sagaActions';
import { getUser } from '../selectors/user.selectors';
import { RoomsActions } from '../slices/rooms.slice';

let SOCKET: WebSocket;

function* listenForSocketMessages(roomId: number): SagaIterator {
  let socketChannel: EventChannel<typeof SOCKET> | undefined;

  try {
    const user = yield select(getUser);

    SOCKET = yield call(createWebSocketConnection);
    socketChannel = SOCKET ? yield call(createSocketChannel, SOCKET) : undefined;

    SOCKET?.send(JSON.stringify({ type: wsActions.CONNECT, user, roomId }));
    while (true) {
      const payload: string = socketChannel ? yield take(socketChannel) : '';
      const parsedPayload = JSON.parse(payload);

      switch (parsedPayload.type) {
        case wsActions.CONNECTED:
          yield put(RoomsActions.setRoom(parsedPayload.room));
          yield put(RoomsActions.setIsConnected(true));
          break;
        case wsActions.LEAVE:
        case wsActions.DISCONNECTED:
          yield put(RoomsActions.setIsConnected(false));
          break;
        case wsActions.USER_CONNECTED:
        case wsActions.USER_DISCONNECTED:
          yield put(RoomsActions.refreshUsers(parsedPayload.users));
          break;
        case wsActions.CODE:
          yield put(RoomsActions.refreshCode(parsedPayload.code));
          break;
        case wsActions.CURSOR:
          // yield put(RoomsActions.refreshCursor(parsedPayload.users));
          break;
        case wsActions.CHAT:
          yield put(RoomsActions.refreshChat(parsedPayload.messages));
          break;
        default:
          break;
      }
    }
  } catch (error) {
    console.log('Error while connecting to the WebSocket', error);
  } finally {
    if (yield cancelled()) {
      socketChannel?.close();
      SOCKET?.close();
    } else {
      console.log('WebSocket disconnected');
    }
  }
}

export function* connect({ payload }: PayloadAction<number>) {
  const socketTask: Task = yield fork(listenForSocketMessages, payload);

  yield take(roomsAction.LEAVE);
  yield put(RoomsActions.setIsConnected(false));
  yield cancel(socketTask);
}

export const send = (payload: any) => SOCKET.send(JSON.stringify(payload));

export function* wsSaga() {
  yield takeEvery(roomsAction.JOIN, connect);
}

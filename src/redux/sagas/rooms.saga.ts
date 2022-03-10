import { PayloadAction } from '@reduxjs/toolkit';
import { EventChannel, SagaIterator, Task } from 'redux-saga';
import { call, cancel, cancelled, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { RoomsApi } from '../../api/RoomApi';
import { createSocketChannel, createWebSocketConnection } from '../../api/WebSocketApi';
import { Room } from '../../utils/types/rooms.types';
import { roomsAction } from '../actions/sagaActions';
import { getRoomId } from '../selectors/rooms.selectors';
import { getUser, getUserId } from '../selectors/user.selectors';
import { RoomsActions } from '../slices/rooms.slice';
import { UserActions } from '../slices/user.slice';

let SOCKET: WebSocket;

const send = (payload: any) => SOCKET.send(JSON.stringify(payload));

function* getRooms() {
  const rooms: Room[] = yield call(RoomsApi.getRooms);
  yield put(RoomsActions.setRooms(rooms));
}

function* leaveRoom() {
  const roomId: number = yield select(getRoomId);
  const userId: number = yield select(getUserId);

  try {
    yield call(send, { type: 'LEAVE', roomId, userId });
  } catch (error) {
    console.log(error);
  }
}

function* changeCursor({ payload: position }: PayloadAction<{ x: number; y: number }>) {
  const roomId: number = yield select(getRoomId);
  const user: number = yield select(getUser);

  yield call(send, { type: 'CURSOR', roomId, user, position });
}

function* changeCode({ payload: code }: PayloadAction<string>) {
  const roomId: number = yield select(getRoomId);

  yield call(send, { type: 'CODE', roomId, code });
}

function* listenForSocketMessages(roomId: number): SagaIterator {
  let socketChannel: EventChannel<typeof SOCKET> | undefined;

  try {
    const user = yield select(getUser);

    SOCKET = yield call(createWebSocketConnection);
    socketChannel = SOCKET ? yield call(createSocketChannel, SOCKET) : undefined;

    SOCKET?.send(JSON.stringify({ type: 'CONNECT', user, roomId }));
    while (true) {
      const payload: string = socketChannel ? yield take(socketChannel) : '';
      const parsedPayload = JSON.parse(payload);
      console.log(parsedPayload);

      switch (parsedPayload.type) {
        case 'CONNECTED':
          yield put(RoomsActions.setRoom(parsedPayload.room));
          yield put(RoomsActions.setIsConnected(true));
          break;
        case 'CODE':
          yield put(RoomsActions.changeCode(parsedPayload.code));
          break;
        case 'LEAVE':
        case 'DISCONNECTED':
          yield put(RoomsActions.setIsConnected(false));
          break;
        case 'USER_CONNECTED':
        case 'USER_DISCONNECTED':
          yield put(RoomsActions.refreshRoom(parsedPayload.room));
          break;
        case 'CURSOR':
          yield put(RoomsActions.refreshRoom(parsedPayload.room));
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

export function* roomsSaga() {
  yield takeEvery(roomsAction.ROOMS, getRooms);
  yield takeEvery(roomsAction.JOIN, connect);
  yield takeEvery(roomsAction.LEAVE, leaveRoom);
  yield takeEvery(roomsAction.CODE, changeCode);
  yield takeEvery(roomsAction.CURSOR, changeCursor);
}

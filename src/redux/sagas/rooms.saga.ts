import { Task } from 'redux-saga';
import { call, cancel, delay, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { RoomsApi } from '../../api/RoomApi';
import { Room } from '../../utils/types/rooms.types';
import { roomsAction } from '../actions/sagaActions';
import { getRoomId } from '../selectors/rooms.selectors';
import { getUserId } from '../selectors/user.selectors';
import { RoomsActions } from '../slices/rooms.slice';
import { send } from './ws.saga';

function* fetchingRooms() {
  try {
    while (true) {
      const rooms: Room[] = yield call(RoomsApi.getRooms);
      yield put(RoomsActions.setRooms(rooms));
      yield delay(5000);
    }
  } catch (error) {}
}

function* getRooms() {
  const fetching: Task = yield fork(fetchingRooms);

  yield take(roomsAction.STOP_FETCH_ROOMS);
  yield cancel(fetching);
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

function* joinLive({ payload }: any) {
  const roomId: number = yield select(getRoomId);
  const userId: number = yield select(getUserId);

  try {
    yield call(send, { type: 'JOIN_LIVE', roomId, userId, userPeerId: payload });
  } catch (error) {
    console.log(error);
  }
}

export function* roomsSaga() {
  yield takeEvery(roomsAction.START_FETCH_ROOMS, getRooms);
  yield takeEvery(roomsAction.LEAVE, leaveRoom);
  yield takeEvery(roomsAction.JOIN_LIVE, joinLive);
}

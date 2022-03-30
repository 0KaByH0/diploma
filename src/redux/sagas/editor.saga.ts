import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { editorAction } from '../actions/sagaActions';
import { getRoomId } from '../selectors/rooms.selectors';
import { getUser, getUserId } from '../selectors/user.selectors';
import { UserActions } from '../slices/user.slice';
import { send } from './ws.saga';

function* changeCursor({ payload: position }: PayloadAction<{ x: number; y: number }>) {
  const roomId: number = yield select(getRoomId);
  const user: number = yield select(getUser);

  yield put(UserActions.refreshCursor({ position }));
  yield call(send, { type: 'CURSOR', roomId, user, position });
}

function* changeCode({ payload: code }: PayloadAction<string>) {
  const roomId: number = yield select(getRoomId);

  yield call(send, { type: 'CODE', roomId, code });
}

function* sendMessageInChat({ payload: message }: PayloadAction<string>) {
  const roomId: number = yield select(getRoomId);
  const userId: number = yield select(getUserId);

  yield call(send, { type: 'CHAT', roomId, userId, message });
}

export function* editorSaga() {
  yield takeEvery(editorAction.CODE, changeCode);
  yield takeEvery(editorAction.CURSOR, changeCursor);
  yield takeEvery(editorAction.SEND_CHAT, sendMessageInChat);
}

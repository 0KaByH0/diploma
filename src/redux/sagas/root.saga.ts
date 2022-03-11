import { all, call } from 'redux-saga/effects';
import { editorSaga } from './editor.saga';
import { roomsSaga } from './rooms.saga';
import { userSaga } from './user.saga';
import { wsSaga } from './ws.saga';

export function* rootSaga() {
  yield all([call(userSaga), call(roomsSaga), call(editorSaga), call(wsSaga)]);
}

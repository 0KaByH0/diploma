import { all, call } from 'redux-saga/effects';
import { roomsSaga } from './rooms.saga';
import { userSaga } from './user.saga';

export function* rootSaga() {
  yield all([call(userSaga), call(roomsSaga)]);
}

import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { UserApi } from '../../api/UserApi';
import { User } from '../../utils/types/app.types';
import { leaveAction, userAction } from '../actions/sagaActions';
import { UserActions } from '../slices/user.slice';

function* signIn({ payload }: PayloadAction<{ email: string; password: string }>) {
  const user: User = yield call(UserApi.signIn, payload.email, payload.password);
  if (user) {
    yield put(UserActions.setUser(user));
    yield put(UserActions.setIsAuth(true));
  } else {
    yield put(UserActions.setIsAuth(false));
  }
}

function* signUp({ payload: user }: PayloadAction<User>) {
  yield call(UserApi.signUp, user);
}

function* signOut() {
  yield put(leaveAction());
  yield put(UserActions.clearUser());
}

export function* userSaga() {
  yield takeEvery(userAction.SIGN_IN, signIn);
  yield takeEvery(userAction.SIGN_UP, signUp);
  yield takeEvery(userAction.SIGN_OUT, signOut);
}

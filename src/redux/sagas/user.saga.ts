import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { UserApi } from '../../api/UserApi';
import { User } from '../../utils/types/app.types';
import { leaveAction, signInAction, userAction } from '../actions/sagaActions';
import { UserActions } from '../slices/user.slice';

function* signIn({ payload }: PayloadAction<{ email: string; password: string }>) {
  const user: User = yield call(UserApi.signIn, payload.email, payload.password);
  if (user) {
    yield put(UserActions.setUser(user));
    yield put(UserActions.setIsAuth(true));
    return true;
  } else {
    // should show modal incorrect email or password
    // yield;
    yield put(UserActions.setIsAuth(false));
    return false;
  }
}

function* signUp({ payload: user }: PayloadAction<User>) {
  yield call(UserApi.signUp, user);
  yield put(signInAction({ email: user.email, password: user.password ?? '' }));
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

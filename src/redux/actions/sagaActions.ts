import { createAction } from '@reduxjs/toolkit';
import { User } from '../../utils/types/app.types';

export const userAction = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
};

export const roomsAction = {
  ROOMS: 'ROOMS',
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CODE: 'CODE',
  CURSOR: 'CURSOR',
};

// ROOMS ACTIONS

export const codeAction = createAction<string>(roomsAction.CODE);

export const cursorAction = createAction<{ x: number; y: number }>(roomsAction.CURSOR);

export const leaveAction = createAction(roomsAction.LEAVE);

// USER ACTIONS
export const signInAction = createAction<{ email: string; password: string }>(userAction.SIGN_IN);

export const signUpAction = createAction<User>(userAction.SIGN_UP);

export const signOutAction = createAction(userAction.SIGN_OUT);

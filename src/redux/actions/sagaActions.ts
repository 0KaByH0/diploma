import { createAction } from '@reduxjs/toolkit';
import { User } from '../../utils/types/app.types';

export const userAction = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
};

export const roomsAction = {
  START_FETCH_ROOMS: 'START_FETCHING_ROOMS',
  STOP_FETCH_ROOMS: 'STOP_FETCHING_ROOMS',
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  CODE: 'CODE',
  CURSOR: 'CURSOR',
};

export const editorAction = {
  CODE: 'CODE',
  CURSOR: 'CURSOR',
};

// ROOMS ACTIONS
export const startFetchingRooms = createAction(roomsAction.START_FETCH_ROOMS);

export const stopFetchingRooms = createAction(roomsAction.STOP_FETCH_ROOMS);

export const joinRoomAction = createAction<number>(roomsAction.JOIN);

export const leaveAction = createAction(roomsAction.LEAVE);

// USER ACTIONS
export const signInAction = createAction<{ email: string; password: string }>(userAction.SIGN_IN);

export const signUpAction = createAction<User>(userAction.SIGN_UP);

export const signOutAction = createAction(userAction.SIGN_OUT);

// EDITOR ACTIONS
export const codeAction = createAction<string>(editorAction.CODE);

export const cursorAction = createAction<{ x: number; y: number }>(editorAction.CURSOR);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../utils/types/app.types';
import { RoomsActions } from './rooms.slice';

type UserState = {
  id: number;
  name: string;
  email: string;
  company: string;
  isAuth: boolean;
  editor: {
    position: { x?: number; y?: number };
    // selection: { start: number; end: number };
  };
};

const initialState = {
  id: 0,
  name: '',
  email: '',
  company: '',
  isAuth: false,
  editor: { position: { x: 0, y: 0 } },
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.company = payload.company;
      state.editor = payload.editor;
    },
    clearUser: () => initialState,
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
    refreshCursor: (
      state,
      { payload }: PayloadAction<{ position: { x?: number; y?: number } }>,
    ) => {
      state.editor.position = payload.position;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: UserActions, reducer: user } = userSlice;

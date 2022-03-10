import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../utils/types/rooms.types';
import { UserActions } from './user.slice';

type RoomsState = {
  rooms: Room[];
  currentRoom: Room | {};
  isLoading: boolean;
  isConnected: boolean;
};

const initialState = {
  rooms: [],
  currentRoom: {},
  isConnected: false,
  isLoading: false,
} as RoomsState;

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, { payload }: PayloadAction<Room[]>) => {
      state.rooms = payload;
    },
    setRoom: (state, { payload }: PayloadAction<Room>) => {
      state.isConnected = true;
      state.currentRoom = payload;
    },
    refreshRoom: (state, { payload }: PayloadAction<Room>) => {
      state.currentRoom = payload;
    },
    changeCode: (state, { payload }: PayloadAction<string>) => {
      //@ts-ignore
      state.currentRoom.code = payload;
    },
    clearRoom: (state) => {
      state.currentRoom = {};
      state.isConnected = false;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserActions.clearUser, (state, action) => {
      state.isConnected = false;
    });
  },
});

export const { actions: RoomsActions, reducer: rooms } = roomsSlice;

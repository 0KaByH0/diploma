import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyRoom } from '../../utils/consts/rooms.consts';
import { User } from '../../utils/types/app.types';
import { Room } from '../../utils/types/rooms.types';
import { UserActions } from './user.slice';

type RoomsState = {
  rooms: Room[];
  currentRoom: Room;
  isLoading: boolean;
  isConnected: boolean;
};

const initialState = {
  rooms: [],
  currentRoom: emptyRoom,
  isConnected: false,
  isLoading: false,
} as RoomsState;

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    //ROOMS
    setRooms: (state, { payload }: PayloadAction<Room[]>) => {
      state.rooms = payload;
    },

    //ROOM
    setRoom: (state, { payload }: PayloadAction<Room>) => {
      state.isConnected = true;
      state.currentRoom = payload;
    },
    clearRoom: (state) => {
      state.currentRoom = emptyRoom;
      state.isConnected = false;
    },

    //LOADING
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },

    //REFRESH
    refreshUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.currentRoom.users = payload;
    },
    refreshRoom: (state, { payload }: PayloadAction<Room>) => {
      state.currentRoom = payload;
    },
    refreshCode: (state, { payload }: PayloadAction<string>) => {
      state.currentRoom.code = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserActions.clearUser, (state, action) => {
      state.isConnected = false;
    });
  },
});

export const { actions: RoomsActions, reducer: rooms } = roomsSlice;

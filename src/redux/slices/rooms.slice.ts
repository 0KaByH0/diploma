import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyRoom } from '../../utils/consts/rooms.consts';
import { Message, User } from '../../utils/types/app.types';
import { Room } from '../../utils/types/rooms.types';
import { UserActions } from './user.slice';

const getRandomColor = () => `#${((Math.random() * 0xffffff) << 0).toString(16)}`;

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
      state.currentRoom.users = state.currentRoom.users.map((user) => ({
        ...user,
        editor: { ...user.editor, color: getRandomColor() },
      }));
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
    connectedUser: (state, { payload }: PayloadAction<User>) => {
      state.currentRoom.users.push({
        ...payload,
        editor: { ...payload.editor, color: getRandomColor() },
      });
    },
    disConnectedUser: (state, { payload }: PayloadAction<User>) => {
      state.currentRoom.users = state.currentRoom.users.filter((user) => user.id !== payload.id);
    },
    refreshRoom: (state, { payload }: PayloadAction<Room>) => {
      state.currentRoom = payload;
    },
    refreshCode: (state, { payload }: PayloadAction<string>) => {
      state.currentRoom.code = payload;
    },
    refreshCursor: (state, { payload }: PayloadAction<User>) => {
      const user = state.currentRoom.users.find((user) => user.id === payload.id);
      if (user) {
        user.editor.position = payload.editor.position;
      }
    },
    refreshChat: (state, { payload }: PayloadAction<Message[]>) => {
      state.currentRoom.messages = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserActions.clearUser, (state, action) => {
      state.isConnected = false;
    });
  },
});

export const { actions: RoomsActions, reducer: rooms } = roomsSlice;

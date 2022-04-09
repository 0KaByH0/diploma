import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../utils/types/redux.types';
import { Room } from '../../utils/types/rooms.types';

export const getRooms = (state: RootState) => state.rooms.rooms;

export const getCurrentRoom = (state: RootState) => state.rooms.currentRoom as Room;

export const getRoomCode = createSelector(getCurrentRoom, (room) => room.code);

export const getRoomLang = createSelector(getCurrentRoom, (room) => room.language);

export const getRoomUsers = createSelector(getCurrentRoom, (room) => room.users);

export const getChat = createSelector(getCurrentRoom, (room) => room.messages);

export const getRoomId = createSelector(getCurrentRoom, (room) => room.id);

export const getNewUserPeerId = createSelector(
  getCurrentRoom,
  (room) => room.liveChat.at(-1)?.userPeerId,
);

export const getLiveChat = createSelector(getCurrentRoom, (room) => room.liveChat);

export const getIsChatOpen = (state: RootState) => state.rooms.isOpenChat;

export const getIsConnected = (state: RootState) => state.rooms.isConnected;

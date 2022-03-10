import { Languages, User } from './app.types';

export type Room = {
  id: number;
  name: string;
  users: User[];
  language: Languages;
  code: string;
};

export type RoomDisplay = {
  id: number;
  name: string;
  userAmount: number;
  language: Languages;
};

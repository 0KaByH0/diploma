import { Languages, Message, User } from './app.types';

export type Room = {
  id: number;
  name: string;
  users: User[];
  language: Languages;
  code: string;
  messages: Message[];
  liveChat: { userPeerId: string; userId: number; name: string }[];
  isLiveChat: boolean;
  maxUsers: number;
  password: string;
  company: string;
};

export type RoomDisplay = {
  id: number;
  name: string;
  userAmount: number;
  language: Languages;
};

export type RoomFilter = {
  on: boolean;
  searchBy: 'name' | 'id';
  withPass: boolean;
  withUsersMore: number;
  maxUsers: number;
  withLiveChat: boolean;
  lang: 'any' | Languages;
};

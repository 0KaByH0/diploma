import { Languages } from '../types/app.types';

export const emptyRoom = {
  id: -1,
  name: '',
  users: [],
  language: Languages.JAVASCRIPT,
  code: '',
  messages: [],
  liveChat: [],
  isLiveChat: true,
  password: '',
  company: '',
  maxUsers: 10,
};

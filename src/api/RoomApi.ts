import axios from 'axios';
import { Languages } from '../utils/types/app.types';
import { BASE_URL, BASE_URL_ROOMS } from '../utils/consts/api';
import { Room } from '../utils/types/rooms.types';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class RoomsApi {
  static async getRooms() {
    try {
      const response = await axios.get<Room[]>(BASE_URL_ROOMS + '/rooms');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // static async createRoom(userName: string, roomName: string) {
  //   // const response = await axios.get(BASE_URL + '/room/create');
  //   await sleep(2000);
  //   const response = {
  //     id: 1,
  //     roomName,
  //     users: [],
  //     lang: Languages.JAVASCRIPT,
  //   };

  //   return response;
  // }
}

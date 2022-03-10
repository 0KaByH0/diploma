import axios from 'axios';
import { BASE_URL } from '../utils/consts/api';
import { User } from '../utils/types/app.types';

export class UserApi {
  static async signIn(email: string, password: string) {
    // const response = await axios.get(BASE_URL + '/sign-in');
    try {
      const rawUser = window.localStorage.getItem(email) ?? '';
      const user: User = JSON.parse(rawUser);

      if (user.password === password) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signUp(user: User) {
    // const response = await axios.post(BASE_URL + '/sign-up');
    console.log('SIGN UP USER');
    window.localStorage.setItem(user.email, JSON.stringify(user));
  }

  static async signOut(userName: string, password: string) {
    const response = await axios.get(BASE_URL + '/sign-out');
  }
}


import { makeAutoObservable } from "mobx";
import {verifyUsersCookies} from '../CookieService.js';


export class UserModel {

    userData = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(data){
        this.userData=data;
    }
  
    deleteUser() {
      this.userData = null;
    }
  
    async verifyUser() {
      return await verifyUsersCookies(this.userData);
    }

  }

export default new UserModel();
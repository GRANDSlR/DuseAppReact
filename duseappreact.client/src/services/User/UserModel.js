
import { makeAutoObservable } from "mobx";
import {verifyUsersCookies} from '../CookieService.js';


export class UserModel {

    userData = null;

    constructor() {
        if(sessionStorage.getItem("userModel") !==null)
          this.userData = sessionStorage.getItem("userModel");

        makeAutoObservable(this);
    }

    setUser(data){
      sessionStorage.setItem("userModel", data);
      this.userData=data;
    }
  
    deleteUser() {
      sessionStorage.setItem("userModel", null);
      this.userData = null;
    }
  
    async verifyUser() {
      return await verifyUsersCookies(this.userData);
    }

  }

export default new UserModel();
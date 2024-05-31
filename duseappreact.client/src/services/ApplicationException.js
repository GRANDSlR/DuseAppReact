

import { makeAutoObservable } from "mobx";

export class ExceptionState {

    isError = false;
    Message = '';

    constructor() {
        makeAutoObservable(this);
    }

    setException(state, message){
        this.isError = state;
        this.Message = message;
    }
  
    getState() {
      return this.isError;
    }
  
    getMessage() {
      return this.Message;
    }

  }

export default new ExceptionState();
  


import { makeAutoObservable } from "mobx";

export class PopUpState {

    isOpen = false;
    codeBlock = null;

    constructor() {
        makeAutoObservable(this);
    }

    setPopUpState(state, codeBlock){

        this.isOpen = state;
        this.codeBlock = codeBlock;
    }
  
    getState() {
      return this.isOpen;
    }

    getCodeBlock(){
      return this.codeBlock;
    }


  }

export default new PopUpState();
  
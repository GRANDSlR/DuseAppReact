
import { makeAutoObservable } from "mobx";


export class CollegeList {

    data = null;

    constructor() {
        makeAutoObservable(this);
    }

    setData(data){
        this.data=data;
    }
  
  }

export default new CollegeList();


import { makeAutoObservable } from "mobx";


export class currCollegeData {

    data = null;

    constructor() {
        makeAutoObservable(this);
    }

    setData(data){
        this.data=data;
    }
  
  }

export default new currCollegeData();

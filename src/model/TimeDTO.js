import { isDefined } from "../utils/utils";

export default class TimeDTO{
    constructor() {
      this.Hours = 0;
      this.Minutes = 0;
      this.Seconds = 0;
    }

    print = () => {
        //TODO: Print by culture
        return this.#printHours() + ' ' + this.#printMinutes() + ' ' + this.#printSeconds();
    }

    #printHours = () =>{
        return isDefined(this.Hours) ? `${this.Hours}h` : '';
    }

    #printMinutes = () =>{
        return isDefined(this.Minutes) ? `${this.Minutes}min` : '';
    }

    #printSeconds = () =>{
        return isDefined(this.Seconds) ? `${this.Seconds}s` : '';
    }
  }
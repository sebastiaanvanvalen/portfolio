import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

constructor() { }

clock = new Date();

sec = this.clock.getSeconds();
min = this.clock.getMinutes();
hour = this.clock.getHours();

dayNr = this.clock.getDay();
day = this.clock.getDate();
month = this.clock.getMonth();
year = this.clock.getFullYear();

    getTime() {
        setInterval(() => {
            const currentDate = new Date();
            const secondsRatio = currentDate.getSeconds() / 60;
            const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
            const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
            // this.secondHand =  secondsRatio * 360;
            // this.minuteHand =  minutesRatio * 360;
            // this.hourHand =  hoursRatio * 360;
        }, 1000);
    }

    getDate() {

    }

    private convertNumber(number) {
        if (number <= 9) {
            number = '0' + number;
        }
        return number;
    }

}

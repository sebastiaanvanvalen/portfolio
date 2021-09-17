import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock02',
    templateUrl: './clock02.component.html',
    styleUrls: ['./clock02.component.scss'],
})
export class Clock02Component implements OnInit {
    interval
    hourHand;
    minuteHand;
    secondHand;

    constructor() {}

    ngOnInit(): void {
        this.setClock();
    }

    setClock() {
        this.interval = setInterval(() => {
            const currentDate = new Date();
            const secondsRatio = currentDate.getSeconds() / 60;
            const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
            const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
            this.secondHand =  secondsRatio * 360;
            this.minuteHand =  minutesRatio * 360;
            this.hourHand =  hoursRatio * 360;
        }, 1000);
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

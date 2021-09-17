import { Component, OnInit } from '@angular/core';
import { Clock } from '../classes/Clock';
import { MyClock } from '../interfaces/MyClock';

@Component({
    selector: 'app-clock03',
    templateUrl: './clock03.component.html',
    styleUrls: ['./clock03.component.scss'],
})

export class Clock03Component implements OnInit {
    clockMode = 'material';

    public myClock:MyClock;

    interval;

    // constructor(public MyClock: MyClock, private Clock: Clock) {}
    constructor(private Clock:Clock) {
        this.myClock = this.Clock.getClock();
    }

    ngOnInit(): void {
        this.setClock();
    }

    changeStyle(button) {
        button.target.parentElement
            .querySelectorAll('.act')
            .forEach((button) => button.classList.remove('act'));

        button.target.classList.add('act');

        this.changeClass(button);
    }

    changeClass(button) {
        let clockWrapper = Array.from(
            document.getElementsByClassName('clock-item')
        );
        let dateWrapper = Array.from(
            document.getElementsByClassName('date-wrapper')
        );

        dateWrapper.forEach((element) => {
            element.classList.remove(this.clockMode);
            element.classList.add(button.target.innerText.toLowerCase());
        });

        clockWrapper.forEach((element) => {
            element.classList.remove(this.clockMode);
            element.classList.add(button.target.innerText.toLowerCase());
        });

        this.clockMode = button.target.innerText.toLowerCase();
    }

    setClock() {
        this.interval = setInterval(() => {
            this.myClock = this.Clock.getClock();
            
        }, 1000);
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

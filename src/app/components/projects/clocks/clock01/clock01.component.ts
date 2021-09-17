import { Component, OnInit } from '@angular/core';
import { Clock } from '../classes/Clock';
import { MyClock } from '../interfaces/MyClock';

@Component({
    selector: 'app-clock01',
    templateUrl: './clock01.component.html',
    styleUrls: ['./clock01.component.scss'],
})
export class Clock01Component implements OnInit {
    myClock: MyClock;
    interval;

    constructor(private Clock: Clock) {
        this.myClock = this.Clock.getClock();
    }

    ngOnInit(): void {
        this.setClock();
    }

    seconds(level) {
        let unit;
        let node = document.getElementsByClassName(`${level} square active`);

        level === 'second'
            ? (unit = this.myClock.second)
            : level === 'minute'
            ? (unit = this.myClock.minute)
            : (unit = this.myClock.hour);
        while (node[0]) {
            node[0].classList.remove('active');
        }

        document
            .querySelector(`#${level}-wrapper div:nth-child(${unit + 1})`)
            .classList.add('active');

        return `translateY(-${unit * 36}px)`;
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

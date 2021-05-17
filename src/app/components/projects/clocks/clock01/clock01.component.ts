import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock01',
    templateUrl: './clock01.component.html',
    styleUrls: ['./clock01.component.scss'],
})
export class Clock01Component implements OnInit {
    
    interval;
    
    constructor() {}


    ngOnInit(): void {
        this.runClock();
    }
    seconds(level) {
        let clock = new Date();
        let unit;
        let sec = clock.getSeconds();
        let min = clock.getMinutes();
        let hour = clock.getHours()
        let node = document.getElementsByClassName(`${level} square active`)
        
        level === "second" ? unit = sec : level === "minute" ? unit = min : unit = hour
        while (node[0]) {
            node[0].classList.remove('active')
          }
        
        document.querySelector(`#${level}-wrapper div:nth-child(${unit + 1})`).classList.add('active');

        return `translateY(-${unit * 36}px)`
    }

    runClock() {
        this.interval = setInterval(() => {
            let clock = new Date();
            
            document.getElementById('year').innerText = `${this.convertNumber(clock.getFullYear())}`;
            document.getElementById('month').innerText = `${this.convertNumber(clock.getMonth())}`;
            document.getElementById('day').innerText = `${this.convertNumber(clock.getDate())}`;
        }, 1000);
    }

    convertNumber(number) {
        if (number <= 9) {
            number = '0' + number;
        }
        return number;
    }

    ngOnDestroy() {
        if (this.interval) {
          clearInterval(this.interval);
        }
      }
}

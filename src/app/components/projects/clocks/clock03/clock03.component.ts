import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock03',
    templateUrl: './clock03.component.html',
    styleUrls: ['./clock03.component.scss'],
})
export class Clock03Component implements OnInit {
    clockMode = 'material';

    interval;
    sec;
    min;
    hour;
    day;
    date;
    month;
    year;

    constructor() {}

    ngOnInit(): void {
        this.setClock();
    }

    changeStyle(button) {
        button.target.parentElement
            .querySelectorAll('.act')
            .forEach((button) => button.classList.remove('act'));

        button.target.classList.add('act');
        console.log(button);

        this.changeClass(button);
    }

    changeClass(button) {
        let clockWrapper = Array.from(
            document.getElementsByClassName('clock-wrapper')
        );
        let dateWrapper = Array.from(
            document.getElementsByClassName('date-wrapper')
        );
        let element = document.getElementById('container');

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
            let clock = new Date();

            this.sec = this.convertNumber(clock.getSeconds());
            this.min = this.convertNumber(clock.getMinutes());
            this.hour = this.convertNumber(clock.getHours());

            this.day = this.convertDay(clock.getDay());
            this.date = this.convertNumber(clock.getDate());
            this.month = this.convertMonth(clock.getMonth());
            this.year = clock.getFullYear();
        }, 1000);
    }

    convertDay(day): string {
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return days[day];
    }

    convertMonth(month): string {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return months[month];
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

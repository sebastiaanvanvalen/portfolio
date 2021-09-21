import { MyClock } from '../interfaces/MyClock';

export class Clock {

    clock = new Date();
    
    runClock:MyClock = {
        second: this.clock.getSeconds(),
        convertedSecond: this.convertNumber(this.clock.getSeconds()),
        minute: this.clock.getMinutes(),
        convertedMinute: this.convertNumber(this.clock.getMinutes()),
        hour: this.clock.getHours(),
        convertedHour: this.convertNumber(this.clock.getHours()),
        day: this.clock.getDay(),
        convertedDay: this.convertNumber (this.clock.getDay()),
        dayName: this.convertDay(this.clock.getDay()),
        month: this.clock.getMonth(),
        convertedMonth: this.convertNumber(this.clock.getMonth()),
        monthName: this.convertMonth(this.clock.getMonth()),
        year: this.clock.getFullYear(),
    }

    getTime() {
        setInterval(() => {
            const currentDate = new Date();
            const secondsRatio = currentDate.getSeconds() / 60;
            const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
            const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
            
        }, 1000);
    }

    public getClock():MyClock {
        this.refreshClock();
        return this.runClock
    }

    public getSecond():number {
        return this.runClock.second
    }

    public getConvertedSecond():string {
        return this.runClock.convertedSecond
    }

    public getMinute():number {
        return this.runClock.minute;
    }

    public getConvertedMinute():string {
        return this.runClock.convertedMinute
    }

    public getHours():number {
        return this.runClock.hour;
    }

    public getConvertedHour():string {
        return this.runClock.convertedHour
    }

    public getDay():number {
        return this.runClock.day
    }

    public getConvertedDay():string {
        return this.runClock.convertedDay;
    }

    public getDayName():string {
        return this.runClock.dayName;
    }

    public getMonth():number {
        return this.runClock.month
    }

    public getConvertedMonth():string {
        return this.runClock.convertedMonth;
    }

    public getMonthName():string {
        return this.runClock.monthName
    }

    public getYear():number {
        return this.runClock.year
    }

    private refreshClock() {
        this.clock = new Date()

        this.runClock.second = this.clock.getSeconds();
        this.runClock.convertedSecond = this.convertNumber(this.clock.getSeconds());
        this.runClock.minute = this.clock.getMinutes();
        this.runClock.convertedMinute = this.convertNumber(this.clock.getMinutes());
        this.runClock.hour = this.clock.getHours();
        this.runClock.convertedHour = this.convertNumber(this.clock.getHours());
        this.runClock.day = this.clock.getDay();
        this.runClock.convertedDay = this.convertNumber (this.clock.getDay());
        this.runClock.dayName = this.convertDay(this.clock.getDay());
        this.runClock.month = this.clock.getMonth();
        this.runClock.convertedMonth = this.convertNumber(this.clock.getMonth());
        this.runClock.monthName = this.convertMonth(this.clock.getMonth());
        this.runClock.year = this.clock.getFullYear();
    }

    private convertNumber(number) {
        if (number <= 9) {
            number = '0' + number;
        }

        return number;
    }

    private convertDay(day): string {
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

    private convertMonth(month): string {
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
}

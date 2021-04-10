import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    age: number;

    constructor(private TitleService: Title) {
        this.TitleService.setTitle('About - baxxie.nl');
    }

    ngOnInit(): void {
        this.calcAge('06/08/1980');
    }

    calcAge(DOB) {
        let today = new Date();
        let birthDate = new Date(DOB);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        this.age = age;
    }
}

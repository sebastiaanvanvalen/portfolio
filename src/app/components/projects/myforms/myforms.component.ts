import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-myforms',
    templateUrl: './myforms.component.html',
    styleUrls: ['./myforms.component.scss'],
})
export class MyformsComponent implements OnInit {
    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Forms - baxxie.nl');
    }

    ngOnInit(): void {}
}

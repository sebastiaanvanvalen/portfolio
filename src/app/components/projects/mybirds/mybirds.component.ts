import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-mybirds',
    templateUrl: './mybirds.component.html',
    styleUrls: ['./mybirds.component.scss'],
})
export class MybirdsComponent implements OnInit {
    
    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Birding - baxxie.nl')
    }

    ngOnInit(): void {}

}

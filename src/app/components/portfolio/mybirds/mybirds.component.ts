import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-mybirds',
    templateUrl: './mybirds.component.html',
    styleUrls: ['./mybirds.component.scss'],
})
export class MybirdsComponent implements OnInit {

    modalObject = {
        table: {
            title: "table and photo's",
            body: "The table is created with Angular Material and contains all the birds I (100% sure) have spotted. Of some I was able to make a picture. By clicking of the photo icon a request is send to my AWS database to send back the whole picture.<br>In the future it would be good practice to use different sizes of each picture to send to mobile screens in order to save data."
        },
    }
    
    constructor(private TitleService: Title, private ModalService: ModalService) {
        this.TitleService.setTitle('Birding - baxxie.nl')
    }

    ngOnInit(): void {}
    showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal()
    }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    age: number;

    modalObject = {
        about: {
            title: "about...",
            body: "well...<br> my age changes every birthday and the pictures are flexbox. "
        },
    }

    constructor(private TitleService: Title, private ModalService: ModalService) {
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

    showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal()
    }

}

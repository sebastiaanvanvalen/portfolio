import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    constructor(
        private TitleService: Title,
        private ModalService: ModalService
    ) {
        this.TitleService.setTitle('Welkom - baxxie.nl');
    }

    ngOnInit(): void {}

    showModal(): void {
        console.log('button clicked');
        this.ModalService.createModal().then(
            (result) => {
                console.log(result);
            },
            () => {}
        );
    }

    closeDialog() {
        console.log('close');
        document.getElementById('dialog').innerHTML = '';
    }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../services/modal.service';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';



@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    modalObject = {
        buttons: {
            title: "more buttons!!!",
            body: "<img style='height: 35px;' src='./assets/pictures/buttonimage/imabutton.png'><br>Throughout this portfolio there are buttons. Their function is to provide some information about my intentions and the techniques used.<br>Each button calls a modal. I made the models as a component but for their individual content and layout I created a service can set all components variables."
        },
        colorMode: {
            title: "about color modes",
            body: "Just below the navigation bar and on the right side is a small bar saying <span style='color: white; background-color: rgb(96, 145, 161); font-size: 9px; padding: 1px 8px; letter-spacing: 1px;'>light</span> or <span style='color: rgb(200, 177, 177); background-color: rgb(133, 10, 10); font-size: 9px; padding: 1px 8px; letter-spacing: 1px;'>dark</span>.<br>Pushing it will toggle light- and dark mode.<br>Angular makes it easy to change between different color modes when you only use a few colors. At this point the portfolio uses about 20 different colors on different elements which change in different modes.<br>To do this I made a service that toggles all variables in all stylesheets.<br>The setting is stored in the user's <span style='color: rebeccapurple; font-weight: bold;'>localStorage</span> and applied on the next visit."
        },
        navBar: {
            title: "navbar",
            body: "I like animations and enjoy making the rotating Xes when you press 'Portfolio'. The menu items toggle between words and icons depending on the screen size."
        },
        title: {
            title: "logo and titles",
            body: "Angular lets you set the title in the browser bar pretty easy. Then there is the task of creating a logo which is harder than it sounds.<br><div style='height: 35px; width: 100%; text-align: right;'><img style='margin-bottom:20px; width: 35px;' src='./assets/pictures/B.jpeg'></div>"
        }
    }


    constructor(
        private TitleService: Title,
        private ModalService: ModalService
    ) {
        this.TitleService.setTitle('Welkom - baxxie.nl');
    }

    ngOnInit(): void {}

    showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal()
    }

    closeDialog() {
        console.log('close');
        document.getElementById('dialog').innerHTML = '';
    }
}

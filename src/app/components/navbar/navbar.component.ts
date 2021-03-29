import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger(
          'enterAnimation', [
            transition(':enter', [
              style({transform: 'translateX(100%)', opacity: 0}),
              animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
            ]),
            transition(':leave', [
              style({transform: 'translateX(0)', opacity: 1}),
              animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
            ])
          ]
        )
      ],
})
export class NavbarComponent implements OnInit {
    navBar = document.getElementById('nav-main');

    title = 'angular-clickoutside';

    showBox = false;

    constructor() {}

    ngOnInit(): void {}

    onClickedOutside(event: Event) {
        this.showBox = false;
    }
}

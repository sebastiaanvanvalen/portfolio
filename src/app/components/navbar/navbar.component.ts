import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger(
          'enterAnimation', [
            transition(':enter', [
              style({ height: '0px', opacity: 0 }),
            //   style({ transform: 'translateY(-100%)', opacity: '0' }),
              animate('300ms', style({ height: '230px', opacity: 1 })),
            //   animate('300ms', style({ transform: 'translateY(0)', opacity: '1' }))
            ]),
            transition(':leave', [
              style({ height: '230px', opacity: 1 }),
            //   style({ transform: 'translateY(0)', opacity: '1' }),
              animate('150ms', style({ height: '0px', opacity: 0 })),
            //   animate('200ms', style({ transform: 'translateY(-100%)', opacity: '0' }))
            ])
          ]
        )
      ],
})
export class NavbarComponent implements OnInit {
    showBox = false;

    constructor() {}

    ngOnInit(): void {}

    onClickedOutside(event: Event) {
        this.showBox = false;
    }
}

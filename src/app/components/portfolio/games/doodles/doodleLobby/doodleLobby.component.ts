import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-doodleLobby',
    templateUrl: './doodleLobby.component.html',
    styleUrls: ['./doodleLobby.component.scss'],
})
export class DoodleLobbyComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    createGame() {
        const uuid = uuidv4();
        console.log(uuid)
        this.router.navigate(['/doodles', uuid])
    }
}

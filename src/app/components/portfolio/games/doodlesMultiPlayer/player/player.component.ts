import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../classes/Game';
import { User } from '../interface/user';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() id: number;


    playerObject = {
        playerName: '',
        tiles: [],
        diceScore: 0,
    };

    constructor() {}

    ngOnInit() {

    }
}

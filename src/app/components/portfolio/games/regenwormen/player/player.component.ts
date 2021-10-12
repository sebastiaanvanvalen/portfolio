import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
    @Input() id: string;
    @Input() lonelyGame: LonelyGame;

    playerObject = {
        playerName: '',
        tiles: [],
        diceScore: 0,
    };

    constructor() {}

    ngOnInit() {

    }
}

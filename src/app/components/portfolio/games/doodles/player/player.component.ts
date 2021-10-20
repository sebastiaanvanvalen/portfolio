import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-doodles-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class DoodlesPlayerComponent implements OnInit {
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

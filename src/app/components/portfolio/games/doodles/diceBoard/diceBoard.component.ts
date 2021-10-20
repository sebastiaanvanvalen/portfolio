import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-doodles-diceBoard',
    templateUrl: './diceBoard.component.html',
    styleUrls: ['./diceBoard.component.scss'],
})
export class DoodlesDiceBoardComponent implements OnInit {

    @Input() lonelyGame:LonelyGame

    constructor() {}

    ngOnInit() {}

    public throw(){
        if (this.lonelyGame.players[this.lonelyGame.currentPlayerIndex].canThrowDice === true) {
            // in production this needs to be from the perspective of the actual player.
            // this.lonelyGame.throwDice(this.player.id)

            // but for now:
            this.lonelyGame.throwDice(this.lonelyGame.players[this.lonelyGame.currentPlayerIndex].id)

        }


    }
}

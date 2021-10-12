import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-gameBoard',
    templateUrl: './gameBoard.component.html',
    styleUrls: ['./gameBoard.component.scss'],
})
export class GameBoardComponent implements OnInit {
    @Input() lonelyGame: LonelyGame;

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-doodles-gameBoard',
    templateUrl: './gameBoard.component.html',
    styleUrls: ['./gameBoard.component.scss'],
})
export class DoodlesGameBoardComponent implements OnInit {
    @Input() lonelyGame: LonelyGame;

    constructor() {}

    ngOnInit() {}
}

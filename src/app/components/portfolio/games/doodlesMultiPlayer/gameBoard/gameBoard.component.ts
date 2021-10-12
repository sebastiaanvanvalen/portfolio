import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../classes/Game';
import { User } from '../interface/user';

@Component({
    selector: 'app-gameBoard',
    templateUrl: './gameBoard.component.html',
    styleUrls: ['./gameBoard.component.scss'],
})
export class GameBoardComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() opponent: User;

    constructor() {}

    ngOnInit() {

    }
}

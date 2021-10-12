import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../classes/Game';
import { Tile } from '../interface/tile';
import { User } from '../interface/user';

@Component({
    selector: 'app-tableTiles',
    templateUrl: './tableTiles.component.html',
    styleUrls: ['./tableTiles.component.scss'],
})
export class TableTilesComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() opponent: User;

    allTiles:Tile[];

    constructor() {}

    ngOnInit() {
        let tiles = this.Game.tiles.filter(tile => tile.owner = "table")
        this.allTiles = tiles;
    }
}

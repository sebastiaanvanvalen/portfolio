import { Component, OnInit, Input } from '@angular/core';
import { LonelyGame } from '../classes/LonelyGame';
import { Tile } from '../interface/tile';

@Component({
    selector: 'app-tableTiles',
    templateUrl: './tableTiles.component.html',
    styleUrls: ['./tableTiles.component.scss'],
})
export class TableTilesComponent implements OnInit {
    @Input() lonelyGame: LonelyGame;
    allTiles:Tile[];

    constructor() {}

    ngOnInit() {
        let tiles = this.lonelyGame.tiles.filter(tile => tile.owner = "table")
        this.allTiles = tiles;
    }
}

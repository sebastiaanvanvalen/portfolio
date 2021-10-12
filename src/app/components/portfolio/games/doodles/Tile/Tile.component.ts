import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../interface/tile';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
  selector: 'app-Tile',
  templateUrl: './Tile.component.html',
  styleUrls: ['./Tile.component.scss']
})
export class TileComponent implements OnInit {

    @Input() lonelyGame:LonelyGame;

    @Input() tile:Tile;

  constructor() {

   }

  ngOnInit() {
  }

  pickTile() {
      console.log("pick me?")
  }
}

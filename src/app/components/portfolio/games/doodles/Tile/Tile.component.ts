import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../interface/tile';
import { LonelyGame } from '../classes/LonelyGame';



@Component({
  selector: 'app-doodles-Tile',
  templateUrl: './Tile.component.html',
  styleUrls: ['./Tile.component.scss']
})
export class DoodlesTileComponent implements OnInit {

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

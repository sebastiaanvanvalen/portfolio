import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../interface/tile';
import { Game } from '../classes/Game';
import { User } from '../interface/user';
import { SocketIoService } from 'src/app/services/socketio.service';

@Component({
    selector: 'app-Tile',
    templateUrl: './Tile.component.html',
    styleUrls: ['./Tile.component.scss'],
})
export class TileComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() opponent: User;
    @Input() tile: Tile;

    constructor(private SocketIoService: SocketIoService) {}

    ngOnInit() {}

    pickTile() {
        let message = 'your opponent picked a Tile';
        let validPick = this.Game.pickTile(this.tile);
        if (validPick === true) {
            let updateObject = {
                user: this.user,
                message: message,
                players: this.Game.players,
                currentPlayerIndex: this.Game.currentPlayerIndex,
                allDice: this.Game.allDice,
                fixedDice: this.Game.fixedDice,
                tiles: this.Game.tiles,
                updatedOn: new Date().toString(),
            };
            let winCheck = this.Game.checkForWin()
            if (winCheck.passed === true )
            {
                if(winCheck.passed === true)
                this.SocketIoService.sendWinningMessage(winCheck.messageBody)

            }else {
                this.SocketIoService.sendGameUpdate(updateObject)
            }
        }



        
    }
}

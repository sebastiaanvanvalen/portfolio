import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../interface/tile';
import { Game } from '../classes/Game';
import { User } from '../interface/user';
// import { SocketIoService } from 'src/app/services/socketio.service';
import { SocketService } from 'src/app/services/socket.service';
import { UpdateObject } from '../interface/updateObject';


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

    constructor(private SocketService: SocketService) {}

    ngOnInit() {}

    pickTile() {
        let validPick = this.Game.pickTile(this.tile, this.user);
        let winCheck = this.Game.checkForWin()
        
        if (validPick === true) {
            let updateObject:UpdateObject = {
                sender: this.user,
                type: "tileSelect",
                game: {
                    players: this.Game.players,
                    currentPlayerIndex: this.Game.currentPlayerIndex,
                    allDice: this.Game.allDice,
                    fixedDice: this.Game.fixedDice,
                    tiles: this.Game.tiles,
                },
                updatedOn: new Date().toString(),
            };

            let payload = JSON.stringify(updateObject)

            if (winCheck.passed === true ) {
                this.SocketService.sendMessage({ action: 'winMessage', payload: payload })
            }else {
                this.SocketService.sendMessage({ action: 'gameUpdate', payload: payload })
            }
        }        
    }
}

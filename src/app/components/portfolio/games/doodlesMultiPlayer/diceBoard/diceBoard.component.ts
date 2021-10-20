import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../classes/Game';
// import { SocketIoService } from 'src/app/services/socketio.service';
import { SocketService } from 'src/app/services/socket.service';
import { User } from '../interface/user';
import { ModalService } from 'src/app/services/modal.service';
import { UpdateObject } from '../interface/updateObject';

@Component({
    selector: 'app-diceBoard',
    templateUrl: './diceBoard.component.html',
    styleUrls: ['./diceBoard.component.scss'],
})
export class DiceBoardComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() opponent: User;
    image = false;
    fixedDice = [];
    allDice = [];

    throw = false;

    constructor(
        private SocketService: SocketService,
        private ModalService: ModalService
    ) {}

    ngOnInit() {}

    public throwDice() {
        let message = 'your opponent threw some dice';
        let validThrow = this.Game.throwDice(this.user);
        let winCheck = this.Game.checkForWin();

        if (validThrow === true) {
            let updateObject:UpdateObject = {
                sender: this.user,
                type: "diceThrow",
                game: {
                    players: this.Game.players,
                    currentPlayerIndex: this.Game.currentPlayerIndex,
                    allDice: this.Game.allDice,
                    fixedDice: this.Game.fixedDice,
                    tiles: this.Game.tiles,
                },
                updatedOn: new Date().toString(),
            };

            let payload = JSON.stringify(updateObject);
            if (winCheck.passed === true) {
                this.SocketService.sendMessage({
                    action: 'winMessage',
                    payload: payload
                });
            } else {
                this.SocketService.sendMessage({
                    action: 'gameUpdate',
                    payload: payload,
                });
            }
        }
    }
}

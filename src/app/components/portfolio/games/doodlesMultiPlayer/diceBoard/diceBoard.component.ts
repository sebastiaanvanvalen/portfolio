import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../classes/Game';
import { SocketIoService } from 'src/app/services/socketio.service';
import { User } from '../interface/user';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-diceBoard',
    templateUrl: './diceBoard.component.html',
    styleUrls: ['./diceBoard.component.scss'],
})
export class DiceBoardComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() opponent: User;
    image = false
    fixedDice = [];
    allDice = [];

    throw = false
    

    constructor(private SocketIoService:SocketIoService, private ModalService:ModalService) {}

    ngOnInit() {}

    public throwDice(){
        let message = "your opponent threw some dice";
        let validThrow = this.Game.throwDice(this.user)

        if (validThrow === true) {
            let updateObject = {
                user: this.user,
                message: message,
                players: this.Game.players,
                currentPlayerIndex: this.Game.currentPlayerIndex,
                allDice: this.Game.allDice,
                fixedDice: this.Game.fixedDice,
                tiles: this.Game.tiles,
                updatedOn: new Date().toString()
            }

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

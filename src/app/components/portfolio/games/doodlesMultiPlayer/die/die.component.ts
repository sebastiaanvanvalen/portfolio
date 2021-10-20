import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Die } from '../interface/die';
import { Game } from '../classes/Game';
import { User } from '../interface/user';
// import { SocketIoService } from 'src/app/services/socketio.service';
import { SocketService } from 'src/app/services/socket.service';
import { UpdateObject } from '../interface/updateObject';


@Component({
    selector: 'app-die',
    templateUrl: './die.component.html',
    styleUrls: ['./die.component.scss'],
})
export class DieComponent implements OnInit {
    @Input() Game: Game;
    @Input() user: User;
    @Input() die: Die;

    constructor(private SocketService:SocketService) {}

    ngOnInit() {}

    public selectDice(){
        let validSelect = this.Game.selectDice(this.user.userIndex, this.die.value)
        if (validSelect === true) {
            let updateObject:UpdateObject = {
                sender: this.user,
                type: "diceSelect",
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
            this.SocketService.sendMessage({ action: 'gameUpdate', payload: payload })
        }
    }

    public fixDice() {
        let validFix = this.Game.fixDice(this.user.userIndex, this.die.value)
        if (validFix === true) {
            let updateObject:UpdateObject = {
                sender: this.user,
                type: "diceFix",
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
            this.SocketService.sendMessage({ action: 'gameUpdate', payload: payload })
        }

    }

    public styleMe(value) {
        let style;
        switch (value) {
            case 1:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                };
                break;
            case 2:
                style = {
                    top: 'calc(50% + 7.5px)',
                    left: 'calc(50% - 17.5px)',
                    display: 'inline-block',
                    boxShadow: '25px -25px black',
                };
                break;
            case 3:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                    boxShadow: '-12.5px 12.5px black, 12.5px -12.5px black',
                };
                break;
            case 4:
                style = {
                    top: 'calc(50% + 7.5px)',
                    left: 'calc(50% - 17.5px)',
                    display: 'inline-block',
                    boxShadow:
                        '25px 0px black, 0px -25px black, 25px -25px black',
                };
                break;
            case 5:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                    boxShadow:
                        '12.5px 12.5px black, -12.5px 12.5px black, 12.5px -12.5px black, -12.5px -12.5px black',
                };
                break;
            case 6:
                style = {};
                break;
            default:
                break;
        }
        return style;
    }
}

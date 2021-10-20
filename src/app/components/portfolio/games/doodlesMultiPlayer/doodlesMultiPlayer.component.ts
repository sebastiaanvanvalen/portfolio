import {
    Component,
    OnInit,
    ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Game } from './classes/Game';
import { Player } from './classes/Player';
import { AllTiles } from './classes/AllTiles';
import { Title } from '@angular/platform-browser';
// import { SocketIoService } from 'src/app/services/socketio.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './interface/user';
import { GameVar } from '../doodles/interface/gamevar';
import { UpdateObject } from './interface/updateObject';
import { ServerObject } from './interface/serverObject';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
    selector: 'app-doodlesMultiPlayer',
    templateUrl: './doodlesMultiPlayer.component.html',
    styleUrls: ['./doodlesMultiPlayer.component.scss'],
})
export class DoodlesMultiPlayerComponent implements OnInit {
    user: User;

    // should be array for >2 players
    opponent: User;
    myIndex: number;
    opponentIndex: Number;
    gameStarted: boolean = false;
    Game;
    tiles;
    localStorage = window.localStorage;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ModalService: ModalService,
        private TitleService: Title,
        // private SocketIoService: SocketIoService,
        private SocketService: SocketService,
        private snackBar: MatSnackBar
    ) {
        this.router.getCurrentNavigation().extras.state;
        this.TitleService.setTitle('Doodles - baxxie.nl');
    }

    ngOnInit() {
        this.user = JSON.parse(this.localStorage.getItem('doodleUser'));
        this.opponent = {
            userId: '',
            userIndex: -1,
            userName: '',
            createdAt: '',
        };
        this.tiles = new AllTiles();
        this.SocketService.connect();

        this.receiveSocketUpdates();
    }

    private receiveSocketUpdates() {
        this.SocketService.receiveUpdate().subscribe(
            (serverObject: ServerObject) => {
                console.log(serverObject)

                switch (serverObject.message) {
                    case 'firstPlayer':
                        console.log('find solution for subscription');
                        break;

                    case 'twoPlayers':
                        console.log('find solution for subscription');
                        break;
                    case 'gameUpdate':
                        console.log('gameUpdate');
                        this.updateGame(serverObject);

                        break;
                    case 'startGame':
                        this.startGame(serverObject);

                        break;
                    case 'winMessage':
                        this.showWinner(serverObject);

                        break;
                    case 'disconnect':
                        console.log('the game was disconnected from the server, (the other player did it!');
                        this.disconnectGame(serverObject)
                        break;
                    case 'roomFull':
                        console.log('yes room full');
                        break;
                    default:
                        this.ModalService.setBody(
                            'something went wrong<br>please contact administrator via the contactform'
                        );
                        this.ModalService.setTitle('OH oh...');
                        this.ModalService.createModal();
                }
            }
        );
    }

    private startGame(serverObject) {
        console.log(serverObject);
        this.Game = new Game(this.tiles.allTiles, this.ModalService);




        serverObject.payload.Items.forEach((user, index) => {
            if (user.userId === this.user.userId) {
                this.user.userIndex = index;
                this.Game.addPlayer(
                    new Player(index, this.user.userName, user.userId)
                );
            } else {
                this.opponent.userName = user.userName;
                this.opponent.userIndex = index;
                this.opponent.userId = user.userId;
                this.opponent.createdAt = user.createdAt;
                this.Game.addPlayer(
                    new Player(index, this.opponent.userName, user.userId)
                );
            }
            
        });
        this.Game.players[0].playing = true;
        this.gameStarted = true;
    }

    private updateGame(updateObject) {
        console.log(updateObject)
        let payload = JSON.parse(updateObject.payload);
        if (payload.sender.userId === this.user.userId) {
            console.log("dont handle own info")
            return
        } else {


        console.log(updateObject);
        if (this.user.userId !== payload.userId) {
            // this.snackBar.open(updateObject.message, '', {
            //     duration: 10000,
            // });
        }
        this.Game.players = payload.game.players;
        this.Game.currentPlayerIndex = payload.game.currentPlayerIndex;
        this.Game.allDice = payload.game.allDice;
        this.Game.fixedDice = payload.game.fixedDice;
        this.Game.tiles = payload.game.tiles;

    }

    }

    private showWinner(updateObject) {
        let payload = JSON.parse(updateObject.payload);
        this.Game.players = payload.game.players;
        this.Game.currentPlayerIndex = payload.game.currentPlayerIndex;
        this.Game.allDice = payload.game.allDice;
        this.Game.fixedDice = payload.game.fixedDice;
        this.Game.tiles = payload.game.tiles;
        console.log(updateObject);
        this.Game.checkForWin();
    }

    public newGame() {
        this.ModalService.setTitle('lonely player');
        this.ModalService.setBody(
            "simply playing the game means, for now, that you play against yourself. You can watch some functionality concerning the throwing of the dice and picking of the tiles. Also you'll get the errormessages if you make a mistake and everything. If you are invited to play the game you should log in with your given credentials. Now you can play against me and use chat functionality. In the future I want to create AI so you can play against your computer."
        );

        this.ModalService.createModal();
        this.Game = new Game(this.tiles.allTiles, this.ModalService);
    }

    disconnectGame(serverObject) {
        this.ModalService.setTitle('OH NO');
        this.ModalService.setBody(
            "You probably scared the other player away with you high playing skills.<br>So now you are thrown back to the single player mode.<br>It's not your fault... it's not your fault"
        );

        this.ModalService.createModal();
        this.router.navigate(['doodlesMultiPlayer']);
    }

    ngOnDestroy() {
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
        let payload = JSON.stringify(updateObject)

        this.SocketService.sendMessage({ action: 'disconnect', payload: payload })
    }
}

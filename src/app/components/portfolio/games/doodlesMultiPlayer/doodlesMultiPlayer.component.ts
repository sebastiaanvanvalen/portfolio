import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Game } from './classes/Game';
import { Player } from './classes/Player';
import { AllTiles } from './classes/AllTiles';
import { Title } from '@angular/platform-browser';
import { SocketIoService } from 'src/app/services/socketio.service';
// import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './interface/user';
import { GameVar } from '../doodles/interface/gamevar';
import { UpdateObject } from './interface/updateObject';

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
        private SocketIoService: SocketIoService,
        // private SocketService:SocketService,
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
        this.receiveJoinedPlayers();
        this.receiveStartGame();
        this.receiveUpdate();
        this.receiveWinningMessage();
        // this.receiveDisconnect();
    }

    private receiveUpdate() {
        this.SocketIoService.receiveUpdate().subscribe(
            (updateObject: UpdateObject) => {
                console.log(updateObject);
                if (this.user.userId !== updateObject.user.userId) {
                    this.snackBar.open(updateObject.message, '', {
                        duration: 10000,
                    });
                }
                this.Game.players = updateObject.players;
                this.Game.currentPlayerIndex = updateObject.currentPlayerIndex;
                this.Game.allDice = updateObject.allDice;
                this.Game.fixedDice = updateObject.fixedDice;
                this.Game.tiles = updateObject.tiles;
            }
        );
    }

    private receiveStartGame() {
        this.SocketIoService.receiveStartGame().subscribe(
            (startObject: Object) => {
                this.startGame(startObject);
                this.gameStarted = true;
            }
        );
    }

    private receiveJoinedPlayers() {
        this.SocketIoService.receiveJoinedPlayers().subscribe((user: User) => {
            this.snackBar.open(user.userName + ' has joined the table', '', {
                duration: 10000,
                // duration: 3000
            });
        });
    }

    private startGame(startObject) {
        this.Game = new Game(this.tiles.allTiles, this.ModalService);
        startObject.users.forEach((user, index) => {
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
        this.Game.setFirstPlayer(startObject.firstPlayerIndex);
        this.gameStarted = true;
    }

    private receiveWinningMessage() {
        this.SocketIoService.receiveWinningMessage().subscribe(
            (messageBody: string) => {
                this.ModalService.setBody(messageBody);
                this.ModalService.setTitle('we have a winner');
                this.ModalService.createModal();
            }
        );
    }

    public newGame() {
        this.ModalService.setTitle('lonely player');
        this.ModalService.setBody(
            "simply playing the game means, for now, that you play against yourself. You can watch some functionality concerning the throwing of the dice and picking of the tiles. Also you'll get the errormessages if you make a mistake and everything. If you are invited to play the game you should log in with your given credentials. Now you can play against me and use chat functionality. In the future I want to create AI so you can play against your computer."
        );

        this.ModalService.createModal();
        this.Game = new Game(this.tiles.allTiles, this.ModalService);
    }

    // private receiveDisconnect() {
    //     this.SocketIoService.receiveJoinedPlayers().subscribe((user: User) => {
    //         this.ModalService.setBody('count them chickens');
    //         this.ModalService.setBody(
    //             'unfortunately ' +
    //                 user.userName +
    //                 " disconnected from the game and left the room.<br>You'll have to start the game again."
    //         );
    //         this.ModalService.createModal();
    //         this.router.navigate(['/doodles'])
    //     });
    // }

    ngOnDestroy() {
        this.SocketIoService.disconnect(this.user);
    }
}

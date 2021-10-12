import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { LonelyGame } from './classes/LonelyGame';
import { Player } from './classes/Player';
import { AllTiles } from './classes/AllTiles';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-regenwormen',
    templateUrl: './regenwormen.component.html',
    styleUrls: ['./regenwormen.component.scss'],
    providers: []
})
export class RegenwormenComponent implements OnInit {

    // private subject = webSocket('wss://cjzm4j5610.execute-api.eu-central-1.amazonaws.com/production');
    lonelyGame;
    tiles
;
    constructor(private ModalService: ModalService, private TitleService:Title) {
        this.TitleService.setTitle('Doodles - baxxie.nl')
        this.tiles = new AllTiles()
    }

    ngOnInit() {
        this.lonelyGame = new LonelyGame(this.tiles.allTiles, this.ModalService)
        let player1 = this.lonelyGame.addPlayer(new Player("0", "user"))
        let player2 = this.lonelyGame.addPlayer(new Player("1", "comp"))
        this.pickFirstPlayer();
    }

    public newGame() {
        this.ModalService.setTitle("lonely player")
        this.ModalService.setBody("simply playing the game means, for now, that you play against yourself. You can watch some functionality concerning the throwing of the dice and picking of the tiles. Also you'll get the errormessages if you make a mistake and everything. If you are invited to play the game you should log in with your given credentials. Now you can play against me and use chat functionality. In the future I want to create AI so you can play against your computer.")
        this.ModalService.createModal();
        this.lonelyGame = new LonelyGame(this.tiles.allTiles, this.ModalService)
        let player1 = this.lonelyGame.addPlayer(new Player("0", "user"))
        let player2 = this.lonelyGame.addPlayer(new Player("1", "comp"))
        this.pickFirstPlayer();
    }

    public logIn() {

    }

    private pickFirstPlayer() {
        let firstPlayerId = Math.floor(Math.random() * this.lonelyGame.players.length)
        this.lonelyGame.startGame(firstPlayerId)
    }
}

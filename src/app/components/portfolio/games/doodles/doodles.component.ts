import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { LonelyGame } from './classes/LonelyGame';
import { Player } from './classes/Player';
import { AllTiles } from './classes/AllTiles';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-doodles',
  templateUrl: './doodles.component.html',
  styleUrls: ['./doodles.component.scss']
})
export class DoodlesComponent implements OnInit {

    
    lonelyGame
    tiles
;
    constructor(private ModalService: ModalService, private TitleService:Title) {
        this.TitleService.setTitle('Doodles - baxxie.nl')
        this.tiles = new AllTiles()
        this.lonelyGame = new LonelyGame(this.tiles.allTiles, this.ModalService)
        let player1 = this.lonelyGame.addPlayer(new Player("0", "player B"))
        let player2 = this.lonelyGame.addPlayer(new Player("1", "player A"))
    }

    ngOnInit() {
        // this.ModalService.setTitle("lonely player")
        // this.ModalService.setBody("Dear user,<br>You are now on the single player page where you can experiment with the game. But you are kinda just playing against yourself.<br>If you got invited to play a multiplayer game press the button 'enter room' in the top left corner.<br> ENJOY!")
        // this.ModalService.createModal();
        this.pickFirstPlayer();
    }

    public newGame() {

        this.lonelyGame = new LonelyGame(this.tiles.allTiles, this.ModalService)
        let player1 = this.lonelyGame.addPlayer(new Player("0", "player B"))
        let player2 = this.lonelyGame.addPlayer(new Player("1", "player A"))
        this.pickFirstPlayer();
    }

    public logIn() {

    }

    private pickFirstPlayer() {
        let firstPlayerId = Math.floor(Math.random() * this.lonelyGame.players.length)
        this.lonelyGame.startGame(firstPlayerId)
    }
}
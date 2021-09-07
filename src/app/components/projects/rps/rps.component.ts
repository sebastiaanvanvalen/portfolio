import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-rps',
    templateUrl: './rps.component.html',
    styleUrls: ['./rps.component.scss'],
})
export class RpsComponent implements OnInit {
    userScore = 0;
    compScore = 0;
    message = "Ready???";
    userClass = "";
    compClass = "";

    modalObject = {
        rps: {
            title: "Rock, Paper, Scissors",
            body: "Making a Rock-Paper-Scissors game was one of the first tutorials I followed when I wanted to learn more about javaScript. This is my own 'version' of the game. Looking back there were many more, maybe better and more typical ways of styling and timing parts of the game.<br>The choice you hit colors red, green or grey depending on the choice the computer made against you. You have to look good but the text just above that gives you a comment on what happened. And so do the scores.<br>The computer and you have an even chance of winning against eachother so this can be perfectly used for coin flipping."
        },
    }

    constructor(private TitleService: Title, private ModalService:ModalService) {
        this.TitleService.setTitle('Rock Paper Scissors / baxxie.nl')
    }

    ngOnInit(): void {  
    }

    showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal()
    }

    getCompChoice() {
        const compChoice = ['rock', 'paper', 'scissors'];
        const randomNumber = Math.floor(Math.random() * 3);
        return compChoice[randomNumber];
    }

    win(userChoice, compChoice) {
        this.userScore++;
        this.message = `${userChoice} beats ${compChoice}! You WIN!!!`;
        document.getElementById(userChoice).classList.add('green-glow'), 200;
        document.getElementById(compChoice).classList.add('red-glow'), 200;
        setTimeout(() => {
            document.getElementById(userChoice).classList.remove('green-glow'),
            document.getElementById(compChoice).classList.remove('red-glow')
         }, 200);
    }

    lose(userChoice, compChoice) {
        this.compScore++;
        this.message = `${userChoice} loses from ${compChoice}! You lose`;
        document.getElementById(userChoice).classList.add('red-glow'), 200;
        document.getElementById(compChoice).classList.add('green-glow'), 200;
        setTimeout(() => {
            document.getElementById(userChoice).classList.remove('red-glow'),
            document.getElementById(compChoice).classList.remove('green-glow')
         }, 200);
    }

    draw(userChoice, compChoice) {
        this.message = `${userChoice} equals ${compChoice}! it's a draw...`;
        document.getElementById(userChoice).classList.add('gray-glow'), 200;
        document.getElementById(compChoice).classList.add('gray-glow'), 200;
        setTimeout(() => {
            document.getElementById(userChoice).classList.remove('gray-glow'),
            document.getElementById(compChoice).classList.remove('gray-glow')
         }, 200);
    }

    resetScore() {
        if (this.userScore !== 0 || this.compScore !== 0){

            this.userScore = 0;
            this.compScore = 0;
            this.message = "the scores have been reset. Game On!"
        }
    }

    game(userChoice) {
        const compChoice = this.getCompChoice();
        
        switch (userChoice + compChoice) {
            case 'rockscissors':
            case 'paperrock':
            case 'scissorspaper':
                this.win(userChoice, compChoice);
                break;
            case 'rockpaper':
            case 'paperscissors':
            case 'scissorsrock':
                this.lose(userChoice, compChoice);
                break;
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
                this.draw(userChoice, compChoice);
                break;
        }
    }
}

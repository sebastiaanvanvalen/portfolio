import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-mastermind',
    templateUrl: './mastermind.component.html',
    styleUrls: ['./mastermind.component.scss'],
})
export class MastermindComponent implements OnInit {

    colors = [
        'rgb(255, 255, 255)', // white
        'rgb(247, 247, 7)', // yellow
        'rgb(240, 157, 2)', // orange
        'rgb(146, 2, 146)', // purple
        'rgb(4, 161, 4)', // green
        'rgb(8, 8, 253)', // blue
        'rgb(240, 2, 2)', // red
        'rgb(7, 7, 7)', // black
    ];

    hiddenPins = {
        hiddenPin1: 'white',
        hiddenPin2: 'white',
        hiddenPin3: 'white',
        hiddenPin4: 'white',
    };
    hiddenColors = [];
    userPins = [];

    turn = 0;
    hintedPin = false;
    gameStopped = false;
    gameOver = false;
    hiddenPinsShowing = false;

    modalMessage = '';
    modalTitle = '';
    modalButton = '';
    modalBtnInfo = '';

    helpTemplate = `You have 12 chances to quess the hidden colors. Be aware that colors are randomly generated so they can appear more than once.<br>We trust you know the <a href="https://www.spelregels.eu/mastermind/">basics</a> of the game so the only thing left are the markers:<br><br>a '\u2688' if you placed a color in the correct position<br><br> a 'o' : for each color quessed correct but in the wrong position<br>`

    constructor() {}

    ngOnInit(): void {
        this.startGame();
    }

    setHiddenPins() {
        for (var n = 0; n <= 3; n++) {
            let i = Math.floor(Math.random() * 8);
            this.hiddenColors.push(this.colors[i]);
        }

        this.createColorNameArray()
    }

    createColorNameArray() {
        let colors = [];
        Object.values(this.hiddenColors).forEach(element =>{
            switch (element) {
                case 'rgb(255, 255, 255)':
                    colors.push("white")
                    break;
                case 'rgb(7, 7, 7)':
                    colors.push("black")
                    break;
                case 'rgb(240, 157, 2)':
                    colors.push("orange")
                    break;
                case 'rgb(8, 8, 253)':
                    colors.push("blue")
                    break;
                case 'rgb(146, 2, 146)':
                    colors.push("purple")
                    break;
                case 'rgb(4, 161, 4)':
                    colors.push("green")
                    break;
                case 'rgb(240, 2, 2)':
                    colors.push("red")
                    break;
                case 'rgb(247, 247, 7)':
                    colors.push("yellow")
                    break;
                default:
                    break;
            }
        })
        // console.log(colors)
    }

    setColor(input) {
        if (this.gameStopped === false) {
            if (this.userPins.length >= 4) {
                this.toggleModal('toMuchPins');
                return;
            } else {
                this.userPins.push(input);
                document.getElementById('pin-' + [4 * this.turn + 1]).style.backgroundColor = this.userPins[0];
                document.getElementById('pin-' + [4 * this.turn + 2]).style.backgroundColor = this.userPins[1];
                document.getElementById('pin-' + [4 * this.turn + 3]).style.backgroundColor = this.userPins[2];
                document.getElementById('pin-' + [4 * this.turn + 4]).style.backgroundColor = this.userPins[3];
            }
        }
    }

    setCheckBox(input) {
        let tempHiddenColors = this.hiddenColors.slice(); // copys compBoard to a temporary new array to adjust while counting (doubles/singles)
        let x = 0; // number of correct pins placed in setCheckBox()
        let y = 0; // number of correct colors guessed in setCheckBox()

        for (let m = 0; m <= 3; m++) {
            if (tempHiddenColors[m] == input[m]) {
                tempHiddenColors[m] = 'paired';
                input[m] = 'counted';
                x++;
            }
        }

        for (let n = 0; n <= 3; n++) {
            if (input.includes(tempHiddenColors[n]) == true) {
                y++;
                var q = input.indexOf(tempHiddenColors[n]);
                input[q] = 'counted';
            }
        }

        for (let f = 0; f < x; f++){
            document.getElementById('check-box-' + (this.turn + 1)).append("\u2688 ")
        }

        for (let f = 0; f < y; f++){
            document.getElementById('check-box-' + (this.turn + 1)).append('o')
        }

        if (x === 4) {
            this.playerWins();
            x = 0;
            y = 0;
            return
        }

        this.turn++;

        if (this.turn === 12 && x !==4) {
            this.gameStopped = true;
            this.gameOver = true;
            this.toggleModal('gameOver')
        }

        this.userPins = [];
        x = 0;
        y = 0;
    }

    eraseUserBoard() {
        for (let z = 1; z <= 48; z++) {
            document.getElementById('pin-' + z).style.backgroundColor = 'white';
        }

        for (let w = 1; w <= 12; w++) {
            document.getElementById('check-box-' + w).innerHTML = ``;
        }

        Object.keys(this.hiddenPins).forEach((element) => {
            this.hiddenPins[element] = 'white';
        });
    }

    toggleModal(input) {
        this.modalMessage = '';
        this.modalTitle   = '';
        this.modalButton  = '';
        this.modalBtnInfo = '';

        switch (input) {
            case 'help':
                this.modalTitle   = 'The Rules!';
                this.modalMessage = this.helpTemplate;
                this.modalButton  = `Check`;
                break;
            case 'newGame':
                this.modalTitle   = 'Time for a new Game?';
                this.modalMessage = 'You started a new game <br>4 new pins have been generated.<br>Good Luck!';
                this.modalButton  = 'Play!';
                break;
            case 'notEnoughPins':
                this.modalTitle   = 'forgot something?';
                this.modalMessage = 'You have to select 4 pins before submitting. Press "cancel" if you want to select new colors';
                this.modalButton  = 'Continue';
                break;
            case 'toMuchPins':
                this.modalTitle   = "you're going too fast!";
                this.modalMessage = 'You allready selected 4 colors. Pleas press submit or cancel if you want to choose new colors.';
                this.modalButton  = 'Continue';
                break;
            case 'noHint':
                this.modalTitle   = 'muhaha';
                this.modalMessage = 'the hint function only gives you one hint!<br>Good Luck!';
                this.modalButton  = 'Continue';
                break;
            case 'showPins':
                this.modalTitle   = 'No problem';
                this.modalMessage = 'try just a little bit harder next time';
                this.modalButton  = 'Close';
                break;
            case 'showPins':
                this.modalTitle   = 'why was it to hard???';
                this.modalMessage = "don't feel to bad. It happens to everybody.<br>You can allways try again ;-)";
                this.modalButton  = 'Close';
                break;
            case 'playerWon':
                this.modalTitle   = 'Congratulations!';
                this.modalMessage = 'Good job! You won this game.<br>Would you like to try again?';
                this.modalButton  = 'try again!';
                this.modalBtnInfo = 'newGame';
                break;
            case 'gameOver':
                this.modalTitle   = 'Too bad...';
                this.modalMessage = 'you are out of rows and pins.<br>hit the "show Pins" button to see the hidden pins if you want. Or just go ahead and start a new game';
                this.modalButton  = 'Close';
                break;

            default:
                break;
        }

        document.getElementById('mymodal').classList.toggle('show');
    }

    closeModal(input) {
        if (input === 'newGame') {
            this.startGame();
        } else {
            document.getElementById('mymodal').classList.toggle('show');
        }
    }

    closeModalHard() {
        document.getElementById('mymodal').classList.toggle('show');
    }

    submit() {
        if (this.userPins.length < 4) {
            this.toggleModal('notEnoughPins');
        } else {
            this.setCheckBox(this.userPins);
        }
    }

    cancel() {
        this.userPins = [];

        document.getElementById('pin-' + [4 * this.turn + 1]).style.backgroundColor = 'white';
        document.getElementById('pin-' + [4 * this.turn + 2]).style.backgroundColor = 'white';
        document.getElementById('pin-' + [4 * this.turn + 3]).style.backgroundColor = 'white';
        document.getElementById('pin-' + [4 * this.turn + 4]).style.backgroundColor = 'white';
    }

    playerWins() {
        this.showPins();
        this.gameStopped = true;

        setTimeout(() => {
            this.toggleModal('playerWon');
        }, 2000);
    }

    showPins() {
        if(this.hiddenPinsShowing === false){

            if (this.gameOver === true) {
                this.toggleModal('showPins2')
            } else {
                this.toggleModal('showPins');
            }
            
            this.gameStopped = true;
            
            Object.keys(this.hiddenPins).forEach((element, index) => {
                this.hiddenPins[element] = this.hiddenColors[index];
            });
            this.hiddenPinsShowing = true;
        }

    }

    hint() {
        if (this.hintedPin === false) {
            this.hintedPin = true;
            let selectedPin = Math.floor(Math.random() * 4);
            this.hiddenPins[`hiddenPin${selectedPin + 1}`] = this.hiddenColors[selectedPin];
        } else {
            this.toggleModal('noHint');
        }
    }

    startGame() {
        if (this.gameStopped === true || this.turn > 0) {
            this.toggleModal('newGame');
        }

        this.hiddenColors = [];
        this.userPins = [];
        this.turn = 0;
        this.gameStopped = false;
        this.gameOver = false;
        this.hintedPin = false;
    this.hiddenPinsShowing = false;


        this.setHiddenPins();
        this.eraseUserBoard();
    }
}

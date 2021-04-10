import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-mastermind',
    templateUrl: './mastermind.component.html',
    styleUrls: ['./mastermind.component.scss'],
})
export class MastermindComponent implements OnInit {

    colors = [
        'white',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue',
        'red',
        'black',
    ];

    hiddenColors = [];
    hiddenColorsInMode = [];
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

    // CBModi = ['regular', 'colorBlind', 'greyTones', 'hyperActive'];
    CBModi = ['RE', 'CB', 'GT', 'HA']
    CBMode = '';
    colorMode = '';
    storedCBMode = localStorage.getItem('CBMode');

    helpTemplate = `You have 12 chances to quess the hidden colors. Be aware that colors are randomly generated so they can appear more than once.<br>We trust you know the <a href="https://www.spelregels.eu/mastermind/">basics</a> of the game so the only thing left are the markers:<br><br>a '\u2688' if you placed a color in the correct position<br><br> a 'o' : for each color quessed correct but in the wrong position<br>`;

    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Mastermind - baxxie.nl')
    }

    ngOnInit(): void {
        switch (this.storedCBMode) {
            case null:
                this.CBMode = 'RE';
                this.colorMode = 'regular'
                break;
            case 'RE':
                this.CBMode = 'RE';
                this.colorMode = 'regular'
                break;
            case 'CB':
                this.CBMode = 'CB';
                this.colorMode = 'prot.'
                break;
            case 'GT':
                this.CBMode = 'GT';
                this.colorMode = 'grey'
                break;
            case 'HA':
                this.CBMode = 'HA';
                this.colorMode = 'hyper'
                break;
        
            default:
                break;
        }
        if (this.storedCBMode == null) {
        } else {
            this.CBMode = this.storedCBMode;
        }

        this.startGame();
    }

    toggleCBMode() {
        let lastMode = '';
        switch (this.CBMode) {
            case 'RE':
                this.CBMode = 'CB';
                this.colorMode = 'prot.';
                lastMode = 'RE';
            break;
            case 'CB':
                this.CBMode = 'GT';
                this.colorMode = 'grey.';
                lastMode = 'CB';
            break;
            case 'GT':
                this.CBMode = 'HA';
                this.colorMode = 'hyper';
                lastMode = 'GT';
            break;
            case 'HA':
                this.CBMode = 'RE';
                this.colorMode = 'regular';
                lastMode = 'HA';
            break;
            default:
                break;
        }
        
        this.hiddenColorsInMode.forEach((element, index) => {
            this.hiddenColorsInMode[index] = this.CBMode + this.hiddenColors[index]
        })
        
        // toggle all existing userColors
        for (let z = 1; z <= 48; z++) {
            this.colors.forEach((element, index) => {
                if (
                    document
                    .getElementById('pin-' + z)
                    .classList.contains(lastMode + element)
                    ) {
                        document
                        .getElementById('pin-' + z)
                        .classList.remove(lastMode + element);
                        document
                        .getElementById('pin-' + z)
                        .classList.add(this.CBMode + element);
                    }
                });
            }
            
            // toggle hidden pins
            for (let v = 1; v <= 4; v++) {
                if(!document.getElementById('hidden-pin-' + v).classList.contains('pin-background')) {
                    document.getElementById('hidden-pin-' + v).removeAttribute('class');
                    document.getElementById('hidden-pin-' + v).classList.add('hidden-pin', this.hiddenColorsInMode[v - 1]);

                }
            }
            localStorage.setItem('CBMode', this.CBMode);
        }
        
        setHiddenPins() {
            for (var n = 0; n <= 3; n++) {
                let i = Math.floor(Math.random() * 8);
                this.hiddenColors.push(this.colors[i]);
                this.hiddenColorsInMode.push(this.CBMode + this.colors[i]);
            }
            console.log('yes! You can cheat and look up the hidden colors right here. ;-)')
            console.log(this.hiddenColors);
        }
        
        setColor(input) {
            if (this.gameStopped === false) {
                if (this.userPins.length >= 4) {
                    this.toggleModal('toMuchPins');
                    return;
                } else {
                    let mode = '';
                    // this.CBMode ? (mode = 'CB') : (mode = '');
                    let num = this.userPins.length;
                    
                    this.userPins.push(input);
                    document
                    .getElementById('pin-' + [4 * this.turn + (num + 1)])
                    .classList.remove('pin-background');
                    document
                    .getElementById('pin-' + [4 * this.turn + (num +1)])
                    .classList.add(this.CBMode + this.userPins[num]);
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

        for (let f = 0; f < x; f++) {
            document
                .getElementById('check-box-' + (this.turn + 1))
                .append('\u2688 ');
        }

        for (let f = 0; f < y; f++) {
            document.getElementById('check-box-' + (this.turn + 1)).append('o');
        }

        if (x === 4) {
            this.playerWins();
            x = 0;
            y = 0;
            return;
        }

        this.turn++;

        if (this.turn === 12 && x !== 4) {
            this.gameStopped = true;
            this.gameOver = true;
            this.toggleModal('gameOver');
        }

        this.userPins = [];
        x = 0;
        y = 0;
    }

    eraseUserBoard() {
        for (let z = 1; z <= 48; z++) {
            document.getElementById('pin-' + z).removeAttribute('class');
            document
                .getElementById('pin-' + z)
                .classList.add('pin', 'pin-background');
        }

        for (let w = 1; w <= 12; w++) {
            document.getElementById('check-box-' + w).innerHTML = ``;
        }

        for (let v = 1; v <= 4; v++) {
            document.getElementById('hidden-pin-' + v).removeAttribute('class');
            document
                .getElementById('hidden-pin-' + v)
                .classList.add('hidden-pin', 'pin-background');
        }

        // Object.keys(this.hiddenPins).forEach((element) => {
        //     this.hiddenPins[element] = 'rgb(218, 218, 218)';
        // });
    }

    toggleModal(input) {
        this.modalMessage = '';
        this.modalTitle = '';
        this.modalButton = '';
        this.modalBtnInfo = '';

        switch (input) {
            case 'help':
                this.modalTitle = 'The Rules!';
                this.modalMessage = this.helpTemplate;
                this.modalButton = `Check`;
                break;
            case 'newGame':
                this.modalTitle = 'Time for a new Game?';
                this.modalMessage =
                    'You started a new game <br>4 new pins have been generated.<br>Good Luck!';
                this.modalButton = 'Play!';
                break;
            case 'notEnoughPins':
                this.modalTitle = 'forgot something?';
                this.modalMessage =
                    'You have to select 4 pins before submitting. Press "cancel" if you want to select new colors';
                this.modalButton = 'Continue';
                break;
            case 'toMuchPins':
                this.modalTitle = "you're going too fast!";
                this.modalMessage =
                    'You allready selected 4 colors. Pleas press submit or cancel if you want to choose new colors.';
                this.modalButton = 'Continue';
                break;
            case 'noHint':
                this.modalTitle = 'muhaha';
                this.modalMessage =
                    'the hint function only gives you one hint!<br>Good Luck!';
                this.modalButton = 'Continue';
                break;
            case 'playerWon':
                this.modalTitle = 'Congratulations!';
                this.modalMessage =
                    'Good job! <br> <img src="../../../../assets/pictures/celebration.webp" alt="A picture of You winning!"/>';
                this.modalButton = 'try again!';
                this.modalBtnInfo = 'newGame';
                break;
            case 'gameOver':
                this.modalTitle = 'Too bad...';
                this.modalMessage =
                    'you are out of rows and pins.<br>hit the "show Pins" button to see the hidden pins if you want. Or just go ahead and start a new game';
                this.modalButton = 'Close';
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

        document
            .getElementById('pin-' + [4 * this.turn + 1])
            .removeAttribute('class');
        document
            .getElementById('pin-' + [4 * this.turn + 1])
            .classList.add('pin', 'pin-background');
        document
            .getElementById('pin-' + [4 * this.turn + 2])
            .removeAttribute('class');
        document
            .getElementById('pin-' + [4 * this.turn + 2])
            .classList.add('pin', 'pin-background');
        document
            .getElementById('pin-' + [4 * this.turn + 3])
            .removeAttribute('class');
        document
            .getElementById('pin-' + [4 * this.turn + 3])
            .classList.add('pin', 'pin-background');
        document
            .getElementById('pin-' + [4 * this.turn + 4])
            .removeAttribute('class');
        document
            .getElementById('pin-' + [4 * this.turn + 4])
            .classList.add('pin', 'pin-background');
    }

    playerWins() {
        this.showPins("showem");
        this.gameStopped = true;

            this.toggleModal('playerWon');

    }

    showPins(input = '') {



            this.gameStopped = true;


            this.hiddenColorsInMode.forEach((element, index) => {
                document
                    .getElementById('hidden-pin-' + (index + 1))
                    .classList.remove('pin-background');
                document
                    .getElementById('hidden-pin-' + (index + 1))
                    .classList.add(element);
            });
            this.hiddenPinsShowing = true;
    }

    hint() {
        if (this.hintedPin === false) {
            this.hintedPin = true;
            let selectedPin = Math.floor(Math.random() * 4);
            console.log(selectedPin);
            

            document
                .getElementById('hidden-pin-' + (selectedPin + 1))
                .classList.remove('pin-background');
            document
                .getElementById('hidden-pin-' + (selectedPin + 1))
                .classList.add(this.hiddenColorsInMode[selectedPin]);
        } else {
            this.toggleModal('noHint');
        }
    }

    startGame() {
        if (this.gameStopped === true || this.turn > 0) {
            this.toggleModal('newGame');
        }

        this.hiddenColorsInMode = [];
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

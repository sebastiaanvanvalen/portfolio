import { Component, OnInit, HostListener } from '@angular/core';
import { SlotsService } from 'src/app/services/slots.service';
import { slotsAccount } from '../models/slotsAccount';

@Component({
    selector: 'app-wheels-below',
    templateUrl: './wheels-below.component.html',
    styleUrls: ['./wheels-below.component.scss'],
})
export class WheelsBelowComponent implements OnInit {
    @HostListener('window:keyup', ['$event'])
    buttonEvent(event: KeyboardEvent) {
        this.pushButton(event.key);
    }

    slotsAccount: slotsAccount;

    slots = [
        {
            name: 'cherry',
            image: '../assets/pictures/reelIcons/cherry01.png',
            value: 1,
        },
        {
            name: 'lemon',
            image: '../assets/pictures/reelIcons/lemon01.png',
            value: 2,
        },
        {
            name: 'orange',
            image: '../assets/pictures/reelIcons/orange01.png',
            value: 3,
        },
        {
            name: 'peach',
            image: '../assets/pictures/reelIcons/peach01.png',
            value: 4,
        },
        {
            name: 'plum',
            image: '../assets/pictures/reelIcons/plum01.png',
            value: 5,
        },
        {
            name: 'bell',
            image: '../assets/pictures/reelIcons/bell01.png',
            value: 6,
        },
        {
            name: 'grapes',
            image: '../assets/pictures/reelIcons/grapes01.png',
            value: 7,
        },
        {
            name: 'melon',
            image: '../assets/pictures/reelIcons/melon01.png',
            value: 8,
        },
        {
            name: 'diamond',
            image: '../assets/pictures/reelIcons/diamond01.png',
            value: 9,
        },
        {
            name: 'bar',
            image: '../assets/pictures/reelIcons/bar01.png',
            value: 10,
        },
        {
            name: 'question',
            image: '../assets/pictures/reelIcons/questionmark01.png',
            value: 11,
        },
    ];

    reels = [
        [
            {
                name: 'bell',
                image: 'assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: 'assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon01.png',
                value: 7,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark01.png',
                value: 11,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond01.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon01.png',
                value: 7,
            },
        ],
        [
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark01.png',
                value: 11,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon01.png',
                value: 7,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond01.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
        ],
        [
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon01.png',
                value: 7,
            },
            {
                name: 'bar',
                image: '../assets/pictures/reelIcons/bar01.png',
                value: 10,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond01.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach01.png',
                value: 4,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum01.png',
                value: 5,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark01.png',
                value: 11,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell01.png',
                value: 6,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon01.png',
                value: 2,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange01.png',
                value: 3,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes01.png',
                value: 8,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry01.png',
                value: 1,
            },
        ],
    ];

    scores = [
        { name: 'diamonds', slots: [9, 9, 9], value: 200 },
        { name: 'melons', slots: [8, 8, 8], value: 100 },
        { name: 'grapes', slots: [7, 7, 7], value: 20 },
        { name: 'bells', slots: [6, 6, 6], value: 20 },
        { name: 'plums', slots: [5, 5, 5], value: 16 },
        { name: 'plumBar', slots: [5, 5, 10], value: 16 },
        { name: 'peaches', slots: [4, 4, 4], value: 16 },
        { name: 'peachBar', slots: [4, 4, 10], value: 16 },
        { name: 'oranges', slots: [3, 3, 3], value: 16 },
        { name: 'orangeBar', slots: [3, 3, 10], value: 16 },
        { name: 'lemons', slots: [2, 2, 2], value: 12 },
        { name: 'lemonBar', slots: [2, 2, 10], value: 12 },
        { name: 'cherries', slots: [1, 1, 1], value: 8 },
        { name: 'cherryBar', slots: [1, 1, 10], value: 8 },
        { name: 'twoCherries', slots: [1, 1, 0], value: 4 },
        { name: 'oneCherry', slots: [1, 0, 0], value: 4 },
    ];

    playing = true;
    spin = false;

    reel0 = true;
    reel1 = true;
    reel2 = true;

    // is set to true when a winning combi is found to stop looking further. Is set to false when pushing "play"
    win = false;
    wins = 0;
    hOrT = false;
    holding = false;
    holdedReels = [false, false, false];
    reelChart = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    wallet = 100;
    bet = 1;

    allSlots = [];

    constructor(private slotService: SlotsService) {}

    ngOnInit() {
        console.log(this.slotService)
        this.slotsAccount = this.slotService.updateWallet;
        this.spinReels('start');
        // console.log(this.reels)
    }

    public play() {
        if (
            this.spin === false &&
            this.playing === true &&
            this.holdedReels !== [true, true, true]
            ) {
                console.log("spin")
            this.spin = true;
            this.wallet -= 1;
            this.cancelQuestionMarks()
            this.spinReels('inGame');
            this.win = false;

            // if you held a button => reset all holdBtns but reset this.holding the next round
            if (this.holdedReels.includes(true)) {
                this.holding = true;
                this.holdedReels = [false, false, false];
            } else {
                this.holding = false;
            }
        }
    }

    public holdReel(reel) {
        if (this.holding === false) {
            this.holdedReels[reel] = !this.holdedReels[reel];
        } else {
            console.log('not this round');
        }
    }

    public cancel() {
        if (this.holding === false) {
            this.holdedReels = [false, false, false];
        }
    }

    public gamble(choice) {
        console.log(this.hOrT);
        if (this.hOrT === false) {
            return;
        }
        this.hOrT = false;
        let heads = document.getElementById('heads');
        let tails = document.getElementById('tails');
        heads.classList.remove('active');
        heads.classList.remove('active-1');
        tails.classList.remove('active');
        tails.classList.remove('active-2');

        let chance = Math.floor(Math.random() * 2);
        console.log(chance);
        if (chance === 0 && choice === 'heads') {
            console.log('heads! you won');
            heads.classList.add('winGamble');
            this.wallet += 4;
            this.showWinMessage(4);
            this.visualizeWin('oneCherry', null);
        } else if (chance === 1 && choice === 'tails') {
            console.log('tails! you won');
            tails.classList.add('winGamble');
            this.wallet += 4;
            this.showWinMessage(4);
            this.visualizeWin('oneCherry', null);
        } else {
            setTimeout(() => {
                console.log('message that you lost...');
                this.showWinMessage(0);
            }, 2000);
        }
        setTimeout(() => {
            heads.classList.remove('winGamble');
            tails.classList.remove('winGamble');
            this.win = true;
            this.spin = false;
        }, 2000);
    }

    private updateWallet() {
        this.slotService.updateWallet()
    }

    private pushButton(event) {
        switch (event) {
            case 'z':
                this.holdReel(0);
                break;
            case 'x':
                this.holdReel(1);
                break;
            case 'c':
                this.holdReel(2);
                break;
            case 'Enter':
                this.play();
                break;
            default:
                break;
        }
    }

    private spinReels(context) {
        if (context === 'start') {
            this.reels.forEach((element, index) => {
                let positions: number[] = this.setPositions();
                // console.log(positions);

                let reel = document.getElementById('reel-cont-' + (index + 1));
                let reelNr = index;
                let allSlots = reel.getElementsByTagName('img');
                positions.forEach((element, index) => {
                    allSlots[index].id = reelNr.toString() + index.toString();

                    allSlots[index].src = this.reels[reelNr][element].image;
                    allSlots[index].alt = this.reels[reelNr][element].name;
                    // reel.appendChild(slot);
                    this.reelChart[index][reelNr] = this.reels[reelNr][
                        element
                    ].value;
                });
            });
        } else if (context === 'inGame') {
            this.reels.forEach((element, index) => {
                if (this.holdedReels[index] !== true) {
                    let positions: number[] = this.setPositions();
                    // console.log(positions);
                    let reel = document.getElementById(
                        'reel-cont-' + (index + 1)
                    );
                    let reelNr = index;
                    let allSlots = reel.getElementsByTagName('img');

                    // reel.innerHTML = '';

                    setTimeout(() => {
                        positions.forEach((element, index) => {
                            allSlots[index].id =
                                reelNr.toString() + index.toString();

                            allSlots[index].src = this.reels[reelNr][
                                element
                            ].image;
                            allSlots[index].alt = this.reels[reelNr][
                                element
                            ].name;

                            this.reelChart[index][reelNr] = this.reels[reelNr][
                                element
                            ].value;
                        });
                    }, index * 400);
                }
            });
        }

        setTimeout(() => {
            this.checkForWin();
        }, 1250);
        // console.log(this.reelChart)
    }

    private setPositions(): number[] {
        let pos = Math.floor(Math.random() * 23);
        if (pos === 22) {
            return [22, 23, 0];
        } else if (pos === 23) {
            return [23, 0, 1];
        } else {
            return [pos, pos + 1, pos + 2];
        }
    }

    private checkForWin() {
        // check for three questionmarks
        let nrOfQuestionmarks = 0;
        this.allSlots = this.reelChart[0]
            .concat(this.reelChart[1])
            .concat(this.reelChart[2]);

        this.allSlots.forEach((element) => {
            if (element === 11) {
                nrOfQuestionmarks++;
                // this.spin = false;
            }
            this.visualizeQuestionmarks(nrOfQuestionmarks);
        });

        if (nrOfQuestionmarks === 3) {
            this.win = true;
            // this.spin = false;
            let value = this.randomCalc();
            // do some flickers, set some timeout before giving value
            this.wallet += value;
            this.showWinMessage(value);
        }

        // check reelChart for scores
        let winRow = this.reelChart[1];
        if (this.win === false) {
            this.scores.map((items) => {
                if (items.slots.toString() === winRow.toString()) {
                    this.win = true;
                    // this.spin = false;
                    this.wallet += items.value;
                    this.showWinMessage(items.value);
                    this.visualizeWin('score', items);

                    return;
                }
            });
        }

        // check for two cherrys
        if (winRow[0] === 1 && winRow[1] === 1 && this.win === false) {
            if (this.holding === true) {
                this.wallet += 4;
                this.showWinMessage(4);
                this.win = true;
                // this.spin = false;
                console.log('you won: 4');
                this.visualizeWin('twoCherries', null);
            } 

            return;
        }

        // check for one cherry
        if (winRow[0] === 1 && winRow[2] !== 1 && this.win === false) {
            console.log('headsOrTails');
            this.initHeadsOrTails();
            this.hOrT = true;

            return;
        }

        console.log("end wincheck")

        this.spin = false;
    }

    private initHeadsOrTails() {
        let heads = document.getElementById('heads');
        let tails = document.getElementById('tails');
        heads.classList.add('active');
        heads.classList.add('active-1');
        tails.classList.add('active');
        tails.classList.add('active-2');
        // buttons spin
        // animation
        // btnClick = 50/50 change between 0-4 coins
        // after click 1 sec winnig/losing message
    }

    private initAutoHold(context) {
        if (context === 'twoCherries') {
            this.holdedReels = [true, true, false];
        }
        // this.win = true;
        this.spin = false;
    }

    private randomCalc() {
        let values = [
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            20,
            40,
            40,
            40,
            40,
            60,
            60,
            60,
            80,
            80,
            100,
        ];
        return values[Math.floor(Math.random() * 22)];
    }

    private showWinMessage(winnings) {
        let messageBoard = document.getElementById('message');
        if (winnings === 0) {
            // change animation???
            messageBoard.classList.add('win-message');
            messageBoard.innerHTML =
                "<div class='text'>'To Bad...<br>better next time!</div>";
        } else {
            messageBoard.classList.add('win-message');
            messageBoard.innerHTML =
                "<div class='text'>congratulations!<br>You won: " +
                winnings +
                ' coins</div>';
        }

        setTimeout(() => {
            (messageBoard.innerHTML = ''),
                messageBoard.classList.remove('win-message');
        }, 1500);
    }

    private visualizeWin(type, item) {
        console.log(type);
        if (type === 'score') {
            let score = document.getElementById(item.name);
            let slot1 = document.getElementById('01');
            let slot2 = document.getElementById('11');
            let slot3 = document.getElementById('21');
            score.classList.add('win');
            slot1.classList.add('win');
            slot2.classList.add('win');
            slot3.classList.add('win');
            // console.log(slot1)
            setTimeout(() => {
                score.classList.remove('win');
                slot1.classList.remove('win');
                slot2.classList.remove('win');
                slot3.classList.remove('win');
            }, 2000);
        }
        if (type === 'oneCherry') {
            let score = document.getElementById('oneCherry');
            let slot1 = document.getElementById('01');
            score.classList.add('win');
            slot1.classList.add('win');
            // console.log(slot1)
            setTimeout(() => {
                score.classList.remove('win');
                slot1.classList.remove('win');
            }, 2000);
        }
        if (type === 'twoCherries') {
            let score = document.getElementById('twoCherries');
            let slot1 = document.getElementById('01');
            let slot2 = document.getElementById('11');

            score.classList.add('win');
            slot1.classList.add('win');
            slot2.classList.add('win');

            // console.log(slot1)
            setTimeout(() => {
                score.classList.remove('win');
                slot1.classList.remove('win');
                slot2.classList.remove('win');
            }, 2000);
        }
        if (type === 'questionMark') {
        }
    }
    private visualizeQuestionmarks(amount) {
        {

            if (amount < 3) {
                this.allSlots.forEach((element, index) => {
                    if (element === 11) {
                        // console.log(document.getElementById("q" + index))
                        document
                            .getElementById('q' + index)
                            .classList.add('shine');
                    }
                });
            }
        }
    }

    private cancelQuestionMarks() {
        this.allSlots.forEach((element, index) => {
            if (element === 11) {
                document
                    .getElementById('q' + index)
                    .classList.remove('shine');
            }
        });
    }
}

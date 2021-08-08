import { Injectable } from '@angular/core';
import { slotsAccount } from '../components/projects/slots/models/slotsAccount';

@Injectable({
    providedIn: 'root',
})
export class SlotsService {
    slotsAccount: slotsAccount = {
        startingAccount: 100,
        currentAccount: 100,
        bet: 0,
        win: 0,
        currency: 'coins',
        holdedReels: [false, false, false],
    };

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

    reelChart = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    // holding is set when you push HOLD. But also after a win so you cant "auto-win" for ever
    holding = false;

    // is set when game starts with more than 1 coin. Is set to false when account is empty
    playing = true;

    // is set when reels are turning, when hOrT is initiatied and when a message is played. At this time the player cant use the PLAY button so messages e.g have the time to play in good order.
    spin = false;

    // shows which reels are on HOLD
    allSlots = [];

    // is set somewhere in the hierarchy tree. When a win is found other checks are stopped from being excecuted.
    win = false;

    // when headsOrTails (hOrT) is true, the game stops until the player made a gamble.
    hOrT = false;

    constructor() {}

    public updateWallet(): slotsAccount {
        return this.slotsAccount;
    }

    public play(): slotsAccount {
        if (
            this.spin === false &&
            this.playing === true &&
            this.slotsAccount.holdedReels !== [true, true, true]
        ) {

            this.spin = true;
            this.slotsAccount.currentAccount -= 1;
            this.slotsAccount.bet -= 1;
            this.spinReels('inGame');
            this.win = false;
            console.log(this.slotsAccount.holdedReels);
            // if you held a button => reset all holdBtns but reset this.holding the next round
            if (this.slotsAccount.holdedReels.includes(true)) {
                this.holding = true;
                this.slotsAccount.holdedReels = [false, false, false];
            } else {
                this.cancelQuestionMarks();
                this.holding = false;
            }
        }
        return this.slotsAccount;
    }

    public spinReels(context) {
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
                if (this.slotsAccount.holdedReels[index] !== true) {
                    let positions: number[] = this.setPositions();
                    let reel = document.getElementById(
                        'reel-cont-' + (index + 1)
                    );
                    
                    let reelNr = index;
                    let allSlots = reel.getElementsByTagName('img');

                    setTimeout(() => {
                        positions.forEach((element, index) => {
                            allSlots[index].id = reelNr.toString() + index.toString();
                            allSlots[index].src = this.reels[reelNr][element].image;
                            allSlots[index].alt = this.reels[reelNr][element].name;

                            this.reelChart[index][reelNr] = this.reels[reelNr][element].value;
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

    public holdReel(reel): slotsAccount {
        if (this.holding === false) {
            this.slotsAccount.holdedReels[reel] = !this.slotsAccount
                .holdedReels[reel];
        } else {
            console.log('not this round');
        }
        return this.slotsAccount;
    }

    public cancel() {
        if (this.holding === false) {
            this.slotsAccount.holdedReels = [false, false, false];
        }
    }

    public gamble(choice) {

        if (this.hOrT === false) {
            return;
        }

        this.hOrT = false;
        let heads = document.getElementById('heads')
        let tails = document.getElementById('tails');
        heads.classList.remove('active', 'active-1');
        // heads.classList.remove('active-1');
        tails.classList.remove('active', 'active-2');
        // tails.classList.remove('active-2');

        let chance = Math.floor(Math.random() * 2);

        if (chance === 0 && choice === 'heads') {
            heads.classList.add('winGamble');
            this.processWin("oneCherry", null)

        } else if (chance === 1 && choice === 'tails') {
            tails.classList.add('winGamble');
            this.processWin("oneCherry", null)

        } else {
            this.processWin('noCherry', null)

        }
        setTimeout(() => {
            heads.classList.remove('winGamble');
            tails.classList.remove('winGamble');

        }, 2000);
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
            this.processWin("questionMarks", null)
            return;
        }

        // check reelChart for scores
        let winRow = this.reelChart[1];
        if (this.win === false) {
            this.scores.map((items) => {
                if (items.slots.toString() === winRow.toString()) {
                    this.processWin("reels", items)
                    return;
                }
            });
        }

        // check for two cherrys
        if (winRow[0] === 1 && winRow[1] === 1 && this.win === false) {
            if (this.holding === true) {
                this.processWin("twoCherries", null)
            }
            // this return is placed  here in case two cherries fall in place and you want to hold them
            this.spin = false;
            return;
        }

        // check for one cherry
        if (winRow[0] === 1 && winRow[1] !== 1 && winRow[2] !== 1 && this.win === false) {
            this.holding = true;
            this.initHeadsOrTails();
            this.hOrT = true;

            return;
        }
        this.spin = false;
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

    private initHeadsOrTails() {
        let heads = document.getElementById('heads');
        let tails = document.getElementById('tails');
        heads.classList.add('active');
        heads.classList.add('active-1');
        tails.classList.add('active');
        tails.classList.add('active-2');
    }

    private processWin(context, item) {

        switch (context) {
            case "questionMarks":
                let value = this.getQuestionMarkPrize();

                this.playWinMessage(value);
                this.visualizeWin('questionMark', null);
                break;
            
            case "reels":
                this.slotsAccount.currentAccount += item.value;
                this.playWinMessage(item.value);
                this.visualizeWin('score', item);
            break;

            case "twoCherries":
                this.playWinMessage(4);
                this.visualizeWin('twoCherries', null);
                break;
            
            case "oneCherry":
                this.playWinMessage(4);
                this.visualizeWin('oneCherry', null);

            break;

            case "noCherry":
                this.playWinMessage(0);
            default:
                break;
        }

        this.holding = true;
        this.win = true;
        
        setTimeout(() => {
        }, 2000)

    }

    private getQuestionMarkPrize() {
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




    private visualizeWin(type, item) {
        let score;
        if(item !== null) {
            score = document.getElementById(item.name);
        } else {
            score = document.getElementById(type);
        }
        let slot1 = document.getElementById('01');
        let slot2 = document.getElementById('11');
        let slot3 = document.getElementById('21');

        if (type === 'score') {
            score.classList.add('win');
            slot1.classList.add('win');
            slot2.classList.add('win');
            slot3.classList.add('win');

            setTimeout(() => {
                score.classList.remove('win');
                slot1.classList.remove('win');
                slot2.classList.remove('win');
                slot3.classList.remove('win');
            }, 2000);
        }
        if (type === 'oneCherry') {
            score.classList.add('win');
            slot1.classList.add('win');

            setTimeout(() => {
                score.classList.remove('win');
                slot1.classList.remove('win');
            }, 2000);
        }
        if (type === 'twoCherries') {
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
            let slot = "";
            this.allSlots.forEach((element, index)=> {
                if(element === 11) {
                    switch (index) {
                        case 0:
                            slot = "00"
                            break;
                        case 1:
                            slot = "10"
                            
                            break;
                        case 2:
                            slot = "20"
                            
                            break;
                        case 3:
                            slot = "01"
                            
                            break;
                        case 4:
                            slot = "11"
                            
                            break;
                        case 5:
                            slot = "21"
                            
                            break;
                        case 6:
                            slot = "02"
                            
                            break;
                        case 7:
                            slot = "12"
                            
                            break;
                        case 8:
                            slot = "22"
                            
                            break;
                    
                        default:
                            break;
                    }
                    document.getElementById(slot).classList.add("win")
                }

                setTimeout(() => {
                    document.getElementById(slot).classList.remove("win")
                }, 2000)
            })
        }
    }

    private visualizeQuestionmarks(amount) {
        if (amount < 3) {
            this.allSlots.forEach((element, index) => {
                if (element === 11) {
                    // console.log(document.getElementById("q" + index))
                    document.getElementById('q' + index).classList.add('shine');
                }
            });
        }
    }

    private cancelQuestionMarks() {
        console.log(this.allSlots);
        this.allSlots.forEach((element, index) => {
            document.getElementById('q' + index).classList.remove('shine');
        });
    }

    private playWinMessage(amount) {
        let winBar = document.getElementById('message');

        if (amount === 0) {
            winBar.classList.add('win-message');
            winBar.innerText = 'YOU LOST...';
        } else {
            winBar.classList.add('win-message');
            winBar.innerText =
                'YOU WON ' + amount + ' ' + this.slotsAccount.currency;
        }

        setTimeout(() => {
            winBar.classList.remove('win-message');
            winBar.classList.add('throw-prize');
            winBar.innerText = amount.toString();
            // winBar.innerText = "more animation";
            this.deleteWinMessage(amount);

        }, 2000);

    }

    private deleteWinMessage(prize) {
        let winBar = document.getElementById('message');
        setTimeout(() => {
            winBar.classList.remove('throw-prize');
            winBar.innerText = "";
            this.addPrizeToAccount(prize)
            this.spin = false;
        }, 1000)
    }

    private addPrizeToAccount(prize) {
        this.slotsAccount.currentAccount += prize;
    }
}

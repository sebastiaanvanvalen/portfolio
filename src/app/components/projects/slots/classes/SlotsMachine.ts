import { Injectable, EventEmitter, Output } from '@angular/core';

import { slotsAccount } from '../interfaces/slotsAccount';

export class SlotsMachine {
    updateSlotsAccount: EventEmitter<slotsAccount> = new EventEmitter();

    slotsAccount: slotsAccount = {
        startingAccount: 100,
        currentAccount: 100,
        bet: 0,
        currentWin: 0,
        currency: 'coins',
        holding: false,
        holdedReels: [false, false, false],
        spin: false,
        win: false,
        hOrT: false,
        playing: true,
        reelSpin: [],
        reelChart: [[], [], []],
        allSlots: [],
    };

    slots = [
        {
            name: 'cherry',
            image: '../assets/pictures/reelIcons/cherry.png',
            value: 1,
        },
        {
            name: 'lemon',
            image: '../assets/pictures/reelIcons/lemon.png',
            value: 2,
        },
        {
            name: 'orange',
            image: '../assets/pictures/reelIcons/orange.png',
            value: 3,
        },
        {
            name: 'peach',
            image: '../assets/pictures/reelIcons/peach.png',
            value: 4,
        },
        {
            name: 'plum',
            image: '../assets/pictures/reelIcons/plum.png',
            value: 5,
        },
        {
            name: 'bell',
            image: '../assets/pictures/reelIcons/bell.png',
            value: 6,
        },
        {
            name: 'grapes',
            image: '../assets/pictures/reelIcons/grapes.png',
            value: 7,
        },
        {
            name: 'melon',
            image: '../assets/pictures/reelIcons/melon.png',
            value: 8,
        },
        {
            name: 'diamond',
            image: '../assets/pictures/reelIcons/diamond.png',
            value: 9,
        },
        {
            name: 'bar',
            image: '../assets/pictures/reelIcons/bar.png',
            value: 10,
        },
        {
            name: 'question',
            image: '../assets/pictures/reelIcons/questionmark.png',
            value: 11,
        },
    ];

    reels = [
        [
            {
                name: 'bell',
                image: 'assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: 'assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon.png',
                value: 8,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark.png',
                value: 11,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon.png',
                value: 8,
            },
        ],
        [
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark.png',
                value: 11,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon.png',
                value: 8,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
        ],
        [
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'melon',
                image: '../assets/pictures/reelIcons/melon.png',
                value: 8,
            },
            {
                name: 'bar',
                image: '../assets/pictures/reelIcons/bar.png',
                value: 10,
            },
            {
                name: 'diamond',
                image: '../assets/pictures/reelIcons/diamond.png',
                value: 9,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'peach',
                image: '../assets/pictures/reelIcons/peach.png',
                value: 4,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'plum',
                image: '../assets/pictures/reelIcons/plum.png',
                value: 5,
            },
            {
                name: 'question',
                image: '../assets/pictures/reelIcons/questionmark.png',
                value: 11,
            },
            {
                name: 'bell',
                image: '../assets/pictures/reelIcons/bell.png',
                value: 6,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
            {
                name: 'lemon',
                image: '../assets/pictures/reelIcons/lemon.png',
                value: 2,
            },
            {
                name: 'orange',
                image: '../assets/pictures/reelIcons/orange.png',
                value: 3,
            },
            {
                name: 'grapes',
                image: '../assets/pictures/reelIcons/grapes.png',
                value: 7,
            },
            {
                name: 'cherry',
                image: '../assets/pictures/reelIcons/cherry.png',
                value: 1,
            },
        ],
    ];

    // summary of the possible winning combinations on this.reelChart[1]
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

    imageWidth;

    constructor() {}

    public getSlotsAccount(): slotsAccount {
        return this.slotsAccount;
    }

    public getSlotsAccountEmitter() {
        return this.slotsAccount
    }
    
    public setReels() {
        this.reels.forEach((element, index) => {
            this.reels[index] = this.reels[index].concat(this.reels[index], this.reels[index]);
        })
    }
    
    public rebuildMachine(slotsAccount) {
        this.slotsAccount = slotsAccount;
        if (this.slotsAccount.holding === true) {
            this.slotsAccount.holdedReels = [false, false, false]
        }
        this.slotsAccount.spin = false;


        this.reels.forEach((element, index) => {
            let reel = document.getElementById("reel-" + (index + 1))
            let spin = this.slotsAccount.reelSpin[index] * this.imageWidth;
            reel.style.webkitTransform = "translateY(-" + spin + "px)";
            reel.style.transform = "translateY(-" + spin + "px)";
            })
            // this.slotsAccount.holding = true;

            this.updateSlotsAccount.emit(this.slotsAccount)


    }

    public setRatio(imageWidth) {
        this.imageWidth = imageWidth
    }

    public resetGame() {
        this.slotsAccount.currentAccount = 100;
        this.updateSlotsAccount.emit(this.slotsAccount)

    }

    public playRebuildMessage() {
        let winBar = document.getElementById('message');
        this.checkForWin()

        if(this.slotsAccount.hOrT === true) {
            this.initHeadsOrTails()
        }

        winBar.classList.add('win-message');
        winBar.innerText = 'your game has been rebuild';
        winBar.style.fontSize = "16px"
        
        setTimeout(() => {
            winBar.classList.remove('win-message');
            winBar.innerText = "";
            winBar.style.fontSize = "28px"
            
        }, 3000)
    }

    public play() {
        // console.log(this.slotsAccount)
        if(!this.slotsAccount.holdedReels.includes(false)) {
            this.slotsAccount.holdedReels = [false, false, false]
            // play reset message
            this.updateSlotsAccount.emit(this.slotsAccount)

        }

        
        if (this.slotsAccount.spin === false && this.slotsAccount.playing === true) {

            this.slotsAccount.spin = true;
            this.slotsAccount.currentAccount -= 1;
            this.slotsAccount.bet -= 1;
            this.spinReels();
            this.slotsAccount.win = false;

            // if you held a button => reset all holdBtns but reset this.holding the next round
            if (this.slotsAccount.holdedReels.includes(true)) {
                this.slotsAccount.holding = true;
                setTimeout(() => {
                    this.slotsAccount.holdedReels = [false, false, false];
                }, 1800);

            } else {
                this.cancelQuestionMarks();
                this.slotsAccount.holding = false;
            }
        }

        this.updateSlotsAccount.emit(this.slotsAccount)

    }

    public spinReels() {       
        this.reels.forEach((element, index) => {
            if (this.slotsAccount.holdedReels[index] !== true) {
                    let reel = document.getElementById("reel-" + (index + 1))

                    let spinValue = this.getSpinValue();
                    let spin = spinValue * this.imageWidth;

                    this.slotsAccount.reelSpin[index] = spinValue;
                    this.updateSlotsAccount.emit(this.slotsAccount)
                    // this.slotsAccount.spinValues[index] = spinValue;
                    
                    this.slotsAccount.reelChart[0][index] = this.reels[index][spinValue].value;
                    this.slotsAccount.reelChart[1][index] = this.reels[index][spinValue + 1].value;
                    this.slotsAccount.reelChart[2][index] = this.reels[index][spinValue + 2].value;

                    reel.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        reel.style.transform = "translateY(-" + spin + "px)";
            
                    }, 200);
                }
                
            })
            
            setTimeout(() => {
                this.checkForWin();
            }, 2000);
    }

    private getSpinValue() {
       let spinValue = (Math.floor(Math.random() * 24) + 42);
    
       return spinValue;
    }

    public holdReel(reel) {
        if (this.slotsAccount.holding === false) {
            this.slotsAccount.holdedReels[reel] = !this.slotsAccount.holdedReels[reel];
        } else {
            console.log('not this round');
        }

        this.updateSlotsAccount.emit(this.slotsAccount)
    }

    public cancel() {
        if (this.slotsAccount.holding === false) {
            this.slotsAccount.holdedReels = [false, false, false];
        }

        this.updateSlotsAccount.emit(this.slotsAccount)
    }

    public gamble(choice) {
        if (this.slotsAccount.hOrT === false) {

            return;
        }

        this.slotsAccount.hOrT = false;
        let chance = Math.floor(Math.random() * 2);
        let heads = document.getElementById('heads')
        let tails = document.getElementById('tails');

        heads.classList.remove('active', 'active-1');
        tails.classList.remove('active', 'active-2');

        if (chance === 0 && choice === 'heads') {
            heads.classList.add('winGamble');
            this.processWin("oneCherry", null);

        } else if (chance === 1 && choice === 'tails') {
            tails.classList.add('winGamble');
            this.processWin("oneCherry", null);

        } else {
            this.processWin('noCherry', null);
        }

        setTimeout(() => {
            heads.classList.remove('winGamble');
            tails.classList.remove('winGamble');

        }, 2000);

        this.updateSlotsAccount.emit(this.slotsAccount)
    }

    private checkForWin() {

        // check for three questionmarks
        let nrOfQuestionmarks = 0;
        this.slotsAccount.allSlots = this.slotsAccount.reelChart[0].concat(this.slotsAccount.reelChart[1]).concat(this.slotsAccount.reelChart[2]);

        this.slotsAccount.allSlots.forEach((element) => {
            if (element === 11) {
                nrOfQuestionmarks++;

            }
            this.visualizeQuestionmarks(nrOfQuestionmarks);
        });

        if (nrOfQuestionmarks === 3) {
            this.processWin("questionMarks", null);
            return;
        }

        // check reelChart for scores
        let winRow = this.slotsAccount.reelChart[1];
        if (this.slotsAccount.win  === false) {
            this.scores.map((items) => {
                if (items.slots.toString() === winRow.toString()) {
                    this.processWin("reels", items);
                    this.updateSlotsAccount.emit(this.slotsAccount)

                    return;
                }
            });
        }

        // check for two cherrys
        if (winRow[0] === 1 && winRow[1] === 1 &&  this.slotsAccount.win  === false) {
            if (this.slotsAccount.holding === true) {
                this.processWin("twoCherries", null);
            }

            // this return is placed  here in case two cherries fall in place and you want to hold them
            this.slotsAccount.spin = false;
        this.updateSlotsAccount.emit(this.slotsAccount)

            return;
        }

        // check for cherries on outer reels and auto-HOLD
        if (winRow[0] === 1 && winRow[2] === 1&& this.slotsAccount.win  === false) {
            this.slotsAccount.holdedReels = [true, false, true];
        this.updateSlotsAccount.emit(this.slotsAccount)
        }

        // check for one cherry
        if (winRow[0] === 1 && winRow[1] !== 1 && winRow[2] !== 1 && this.slotsAccount.win  === false && this.slotsAccount.holding === false) {
            this.slotsAccount.holding = true;
            this.slotsAccount.holdedReels = [false, false, false];
            
            this.initHeadsOrTails();
            this.slotsAccount.hOrT = true;
            this.updateSlotsAccount.emit(this.slotsAccount)

            return;
        }

        // if a cherry is on HOLD and (only) the third reel gets a cherry. The player still gets a gamble for the first cherry
        if (winRow[0] === 1 && this.slotsAccount.win  === false && this.slotsAccount.holding === true) {
            this.slotsAccount.holding = true;
            this.slotsAccount.holdedReels = [false, false, false];

            this.initHeadsOrTails();
            this.slotsAccount.hOrT = true;
            this.updateSlotsAccount.emit(this.slotsAccount)

            return;
        }
        this.slotsAccount.spin = false;
        this.updateSlotsAccount.emit(this.slotsAccount)
    }

    private initHeadsOrTails() {
        let heads = document.getElementById('heads');
        let tails = document.getElementById('tails');

        heads.classList.add('active');
        heads.classList.add('active-1');
        tails.classList.add('active');
        tails.classList.add('active-2');

        let slot1 = document.getElementById("0-" + (this.slotsAccount.reelSpin[0] + 1));
        slot1.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
        { duration: 500, iterations: 6 });
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
            
                break;
            default:
                break;
        }

        this.slotsAccount.holding = true;
        this.slotsAccount.win  = true;
        this.updateSlotsAccount.emit(this.slotsAccount)

    }

    private getQuestionMarkPrize() {
        let values = [20,20,20,20,20,20,20,20,20,20,20,20,40,40,40,40,60,60,60,80,80,100];

        return values[Math.floor(Math.random() * 22)];
    }

    private visualizeWin(type, item) {
        let score;

        if(item !== null) {
            score = document.getElementById(item.name);
        } else {
            score = document.getElementById(type);
        }

        let slot1 = document.getElementById("0-" + (this.slotsAccount.reelSpin[0] + 1));
        let slot2 = document.getElementById("1-" + (this.slotsAccount.reelSpin[1] + 1));
        let slot3 = document.getElementById("2-" + (this.slotsAccount.reelSpin[2] + 1));

        if (type === 'score') {
            score.classList.add('win');
            slot1.style.borderRadius = "50%";
            slot1.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });
            slot2.style.borderRadius = "50%";
            slot2.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });
            slot3.style.borderRadius = "50%";
            slot3.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });


            setTimeout(() => {
                score.classList.remove('win');
                slot1.style.borderRadius = "none";
                slot2.style.borderRadius = "none";
                slot3.style.borderRadius = "none";
            }, 2000);
        }

        if (type === 'oneCherry') {
            score.classList.add('win');
            slot1.style.borderRadius = "50%";
            slot1.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });

            setTimeout(() => {
                score.classList.remove('win');
                slot1.style.borderRadius = "none";

            }, 2000);
        }

        if (type === 'twoCherries') {
            score.classList.add('win');
            slot1.style.borderRadius = "50%";
            slot1.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });
            slot2.style.borderRadius = "50%";
            slot2.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
            { duration: 400, iterations: 5 });

            setTimeout(() => {
                score.classList.remove('win');
                slot1.style.borderRadius = "none";
                slot2.style.borderRadius = "none";
            }, 2000);
        }

        if (type === 'questionMark') {
            let slot;
            let virtSlot;

            this.slotsAccount.allSlots.forEach((element, index)=> {
                if(element === 11) {
                    switch (index) {
                        case 0:
                            slot = "0-" + (this.slotsAccount.reelSpin[0]);

                            break;
                        case 1:
                            slot = "1-" + (this.slotsAccount.reelSpin[1]);
                            
                            break;
                        case 2:
                            slot = "2-" + (this.slotsAccount.reelSpin[2]);
                            
                            break;
                        case 3:
                            slot = "0-" + (this.slotsAccount.reelSpin[0] + 1);
                            
                            break;
                        case 4:
                            slot = "1-" + (this.slotsAccount.reelSpin[1] + 1);
                            
                            break;
                        case 5:
                            slot = "2-" + (this.slotsAccount.reelSpin[2] + 1);
                            
                            break;
                        case 6:
                            slot = "0-" + (this.slotsAccount.reelSpin[0] + 2);
                            
                            break;
                        case 7:
                            slot = "1-" + (this.slotsAccount.reelSpin[1] + 2);
                            
                            break;
                        case 8:
                            slot = "2-" + (this.slotsAccount.reelSpin[2] + 2);
                            
                            break;
                    
                        default:
                            break;
                    }

                    virtSlot = document.getElementById(slot);
                    virtSlot.style.borderRadius = "50%";
                    virtSlot.animate({ filter: [ 'brightness(1)', 'brightness(1.5)' ], opacity: ["1", ".5"]  },
                    { duration: 400, iterations: 5 });

    
                    setTimeout(() => {
                        virtSlot.style.borderRadius =  "none";
                    }, 2000)
                }
                this.updateSlotsAccount.emit(this.slotsAccount)

            })

            document.getElementById("q0").classList.add("qWin012");
            document.getElementById("q1").classList.add("qWin012");
            document.getElementById("q2").classList.add("qWin012");
            document.getElementById("q3").classList.add("qWin35");
            document.getElementById("q4").classList.add("qWin4");
            document.getElementById("q5").classList.add("qWin35");
            document.getElementById("q6").classList.add("qWin678");
            document.getElementById("q7").classList.add("qWin678");
            document.getElementById("q8").classList.add("qWin678");

            setTimeout(() => {
            document.getElementById("q0").classList.remove("qWin012");
            document.getElementById("q1").classList.remove("qWin012");
            document.getElementById("q2").classList.remove("qWin012");
            document.getElementById("q3").classList.remove("qWin35");
            document.getElementById("q4").classList.remove("qWin4");
            document.getElementById("q5").classList.remove("qWin35");
            document.getElementById("q6").classList.remove("qWin678");
            document.getElementById("q7").classList.remove("qWin678");
            document.getElementById("q8").classList.remove("qWin678");
            }, 2000)
        }
    }

    private visualizeQuestionmarks(amount) {
        if (amount < 3) {
            this.slotsAccount.allSlots.forEach((element, index) => {
                if (element === 11) {
                    document.getElementById('q' + index).classList.add('shine');
                }
            });
        }
    }

    private cancelQuestionMarks() {
        this.slotsAccount.allSlots.forEach((element, index) => {
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
            winBar.innerText = 'YOU WON ' + amount + ' ' + this.slotsAccount.currency;
        }

        if (amount === 0) {
            winBar.classList.remove('win-message');
            this.deleteWinMessage(amount);
            this.slotsAccount.spin = false;

        } else {   
            setTimeout(() => {
                if (amount === 0) {
                    winBar.classList.remove('win-message');
                    winBar.classList.add('throw-prize');
                    winBar.innerText = "";
                    this.deleteWinMessage(amount);

                } else {
                    winBar.classList.remove('win-message');
                    winBar.classList.add('throw-prize');
                    winBar.innerText = amount.toString();
                    this.deleteWinMessage(amount);
                }
            }, 2000);
        }
        this.updateSlotsAccount.emit(this.slotsAccount)

    }

    private deleteWinMessage(prize) {
        let winBar = document.getElementById('message');
        setTimeout(() => {
            winBar.classList.remove('throw-prize');
            winBar.innerText = "";
            this.addPrizeToAccount(prize);
            this.slotsAccount.spin = false;
        }, 1000);
        this.updateSlotsAccount.emit(this.slotsAccount)

    }

    private addPrizeToAccount(prize) {
        this.slotsAccount.currentAccount += prize;
        this.updateSlotsAccount.emit(this.slotsAccount)

    }
}

import { Player } from '../interface/player';
import { Tile } from '../interface/tile';
import { ModalService } from 'src/app/services/modal.service';

export class Game {
    public currentPlayerIndex = 0;
    public players = [];
    public allDice = [];
    public fixedDice = [];

    constructor(public tiles: Tile[], private ModalService: ModalService) {}

    public startGame(id) {
        this.players[id].playing = true;
        this.currentPlayerIndex = id;
    }

    public setFirstPlayer(firstPlayerIndex) {
        this.players[firstPlayerIndex].playing = true;
        this.currentPlayerIndex = firstPlayerIndex;
        this.players[firstPlayerIndex].canThrowDice = true;
    }

    private setNextPlayer(user) {
        this.players[user.userIndex].playing = false;
        if (user.userIndex === 1) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }

        this.players[this.currentPlayerIndex].playing = true;
        this.players[this.currentPlayerIndex].canThrowDice = true;
    }

    public addPlayer(player: Player) {
        if (this.players.length < 2) {
            this.players.push(player);
        } else {
            console.log('to much players are trying to sit at the table');
        }
    }

    public getPlayer(name) {
        return this.players.map((player) => (player.name = name));
    }

    public getPlayers() {
        return this.players;
    }

    public throwDice(user) {
        if (this.players[user.userIndex].playing === false) {
            this.ModalService.setBody("It's not your turn yet");
            this.ModalService.setTitle('ahYes! The Rules');
            this.ModalService.createModal();
        } else if (
            this.players[user.userIndex].playing === true &&
            this.players[user.userIndex].canThrowDice === false
        ) {
            this.ModalService.setBody('You need to pick dice before you can do anything else');
            this.ModalService.setTitle('Reminder');
            this.ModalService.createModal();
            return false;
        } else {
            for (let x = 0; x < 8 - this.fixedDice.length; x++) {
                const value = Math.floor(Math.random() * 6) + 1;
                const doodle = value === 6;
                const dice = {
                    id: x.toString(),
                    value: value,
                    doodle: doodle,
                    selected: false,
                    fixed: false,
                };
                this.allDice.push(dice);
            }

            let check = this.throwCheck();
            console.log(check);
            if (check.passed === false) {
                this.loseRound(user);
                this.ModalService.setBody(check.messageBody);
                this.ModalService.setTitle(check.messageTitle);
                this.ModalService.createModal();
            } else {
                this.players[this.currentPlayerIndex].canThrowDice = false;
                this.players[this.currentPlayerIndex].canFixDice = true;
            }
            return true;
        }
    }

    public selectDice(userIndex, value): boolean {
        if (this.players[userIndex].playing === false) {
            // no messages!
            return
        } else if (this.currentPlayerIndex !== userIndex) {
            return false;
        } else if (this.players[this.currentPlayerIndex].canFixDice === true) {
            this.allDice.forEach((element) => {
                if (element.value === value && element.fixed === false) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    public deselectDice() {
        this.allDice.forEach((die) => (die.selected = false));
    }

    public fixDice(userIndex, value): boolean {
        let check = this.fixDiceCheck(value);
        const activePlayer = this.players[this.currentPlayerIndex]

        if (this.players[userIndex].playing === false) {
            this.ModalService.setBody("It's not your turn!");
            this.ModalService.setTitle("mind the rules please");
            this.ModalService.createModal();
        } else if (
            check.passed === false
        ) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
            return false;
        } else {
            this.deselectDice();

            // then fix all dice with value value
            this.allDice.forEach((element) => {
                if (element.value === value) {
                    // add fixed value to fixedDiceScore
                    if (element.value === 6) {
                        activePlayer.fixedDiceScore += 5;
                    } else {
                        activePlayer.fixedDiceScore += element.value;
                    }
                    element.selected = false;
                    element.fixed = true;
                    this.fixedDice.push(element);
                }

                activePlayer.canFixDice = false;
                activePlayer.canThrowDice = true;
                this.allDice = [];
            });
            return true;
        }
    }

    public pickTile(tile, user) {
        let check = this.tileCheck(tile, user);
        const activePlayer = this.players[this.currentPlayerIndex]
        if (check.passed === false) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
            return false;
        } else {
            // picking a tile from the other player:
            if (
                tile.owner !== 'table' &&
                tile.owner !== activePlayer.name
            ) {
                // before adding a new top tile to the stack make all below inactive
                activePlayer.playersTiles.forEach(
                    (element) => {
                        element.active = false;
                    }
                );
                // take tile from opponent
                let robbedPlayer: Player[] = this.players.filter(
                    (player) => player.name === tile.owner
                );
                console.log(robbedPlayer);
                tile.owner = activePlayer.name;
                activePlayer.playersTiles.push(tile);
                activePlayer.doodleScore += tile.doodleValue;

                robbedPlayer[0].doodleScore -= tile.doodleValue;
                robbedPlayer[0].playersTiles.pop();

                // if robbedPlayer has remaining tiles => activate top tile
                if (robbedPlayer[0].playersTiles.length > 0) {
                    robbedPlayer[0].playersTiles[robbedPlayer[0].playersTiles.length - 1].active = true;
                }
            } else {
                // pick tile from table
                const tileIndex = this.tiles
                    .map((tile) => tile.value)
                    .indexOf(tile.value);
                const selectedTile = this.tiles[tileIndex];

                selectedTile.owner = activePlayer.name;
                this.tiles.splice(tileIndex, 1);
                activePlayer.playersTiles.push(selectedTile);
                activePlayer.doodleScore += tile.doodleValue;
            }

            activePlayer.playing = false;
            activePlayer.canFixDice = false;
            activePlayer.canThrowDice = false;
            activePlayer.fixedDiceScore = 0;

            this.fixedDice = [];

            this.setNextPlayer(activePlayer);

            return true;
        }
    }

    private throwCheck() {
        let returnObject = {
            passed: false,
            messageBody: '',
            messageTitle: '',
        };
        const fixedValues = this.getFixedValues();
        const boardValues = this.getBoardValues();
        const possessedValues = this.getPossessedValues();
        const notPossessedValues = this.getNotPossessedValues();
        const activeTiles = this.getActiveTiles();
        const highestTile = this.getHigestTileValue();
        const thrownDiceSets = this.getThrownDiceSets();
        const overthrowChecker = this.checkOverThrow(thrownDiceSets, highestTile);
        const hasDoodle = this.hasDoodle();
        const distanceToOverThrow = this.getDistanceToOverThrow();
        const activePlayer = this.players[this.currentPlayerIndex]

        console.log('******** start *********');
        console.log("*** thrown value sets:");
        console.log(thrownDiceSets);
        console.log('*** fixedValues :');
        console.log(fixedValues);
        console.log('*** boardValues :');
        console.log(boardValues);
        console.log('*** possessedValues :');
        console.log(possessedValues);
        console.log('*** notPossessedValues :');
        console.log(notPossessedValues);
        console.log('*** availableTiles :');
        console.log(activeTiles);
        console.log('*** overthrowChecker :');
        console.log(overthrowChecker);
        console.log('*** distance to Overthrow :');
        console.log(distanceToOverThrow);
        console.log('******** end *********');


        if (hasDoodle && distanceToOverThrow > 0) {
            console.log("player threw an higher amount as the highest available tile")
        }
        if (hasDoodle && distanceToOverThrow === 0) {
            console.log("player threw the same amount as the highest available tile")
        }

        if (hasDoodle && overthrowChecker && this.fixedDice.length === 8 ) {
            // function in case a player hit "throw" by accident
            activePlayer.canThrowDice = false;
            returnObject = {
                passed: null,
                messageBody: 'no more dice. Take your tile!',
                messageTitle: 'you earned it!',
            };

            return returnObject;

        } else if (!hasDoodle && distanceToOverThrow < 0) {
            returnObject = {
                passed: false,
                messageBody:'you still need a doodle but you will also overthrow if you get one.:<br>' +
                    this.getFixedDiceImage() +
                    ' = (' +
                    activePlayer.fixedDiceScore +
                    ')' +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: 'to bad...',
            };

            return returnObject;

        } else if (!hasDoodle && !notPossessedValues.includes(6) && Object.keys(thrownDiceSets).length === 0) {
            returnObject = {
                passed: false,
                messageBody:
                    'no more dice. No doodles. End of the world:<br>' +
                    this.getFixedDiceImage() +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: "it's not your fault",
            };

            return returnObject;

        } else  if (this.newValues()) {
            returnObject = {
                passed: false,
                messageBody:
                    'unfortunately, you threw only values that you allready collected:<br>' +
                    this.getFixedDiceImage() +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: 'ahYes, the rules!',
            };

            return returnObject;

        } else if (overthrowChecker) {
            returnObject = {
                passed: false,
                messageBody:
                    'unfortinately you overthrew all available tile values<br>You collected:<br>' +
                    this.getFixedDiceImage() +
                    ' = (' +
                    activePlayer.fixedDiceScore +
                    ')' +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: 'oh Darn...',
            };

            return returnObject;

        } else if (!hasDoodle && notPossessedValues.length === 0 && !notPossessedValues.includes(6)) {
            returnObject = {
                passed: false,
                messageBody:
                    'unfortinately you did not collect any Doodles.<br>You allready collected:<br>' +
                    this.getFixedDiceImage() +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: 'ahYes, the rules!',
            };

            return returnObject;

        } else if (notPossessedValues.length === 0) {
            returnObject = {
                passed: false,
                messageBody:
                    'you threw values you allready have.<br>You allready collected:<br>' +
                    this.getFixedDiceImage() +
                    '<br>and you threw:<br>' +
                    this.getAllDiceImage(),
                messageTitle: 'ahYes, the rules!',
            };

            return returnObject;

        } else {
            returnObject = {
                passed: true,
                messageBody: '',
                messageTitle: '',
            };

            return returnObject;
        }
    }

    private fixDiceCheck(value) {
        let returnObject = {
            passed: false,
            messageBody: '',
            messageTitle: '',
        };

        let possessedValues = this.getPossessedValues();
        let thrownDiceSets = this.getThrownDiceSets();
        let highestTileValue = this.getHigestTileValue();
        const safeToFix = this.safeToFix();
        const hasDoodle = this.hasDoodle();
        const activeTiles = this.getActiveTiles();

        let totalValueToFix = value * thrownDiceSets[value.toString()];

        // check if chosen values result in an inevitable death in the next round for not having a doodle yet
        console.log(totalValueToFix + 5  + this.players[this.currentPlayerIndex].fixedDiceScore)
        console.log(highestTileValue)

        if (!hasDoodle && !safeToFix) {
            console.log("check if chosen values result in an inevitable death in the next round");
            returnObject = {
                passed: false,
                messageBody:
                    "You can't choose these dice. Their value plus a minimum of one doodle, that you don't have yet, will result in a higher score than the highest tile available.",
                messageTitle: 'friendly warning',
            };
            return returnObject;
        } else if (hasDoodle && !safeToFix) {
            returnObject = {
                passed: false,
                messageBody:
                    "With these dice you have a higher value than the higest tile available.",
                messageTitle: 'friendly warning',
            };
            return returnObject;
        } else if (possessedValues.includes(value)) {
            returnObject = {
                passed: false,
                messageBody:
                    'this value was allready selected. Choose another value',
                messageTitle: 'Ahyes, the rules!',
            };
            return returnObject;
        } else if (this.players[this.currentPlayerIndex].canFixDice === false) {
            returnObject = {
                passed: false,
                messageBody:
                    'you are not allowed to fix these dice at this point',
                messageTitle: 'Ahyes, the rules!',
            };
            return returnObject;
        } else if (activeTiles.every((val) => val < this.players[this.currentPlayerIndex].fixedDiceScore)) {
            returnObject = {
                passed: false,
                messageBody:
                    'With these dice you would have a higher value than any available tile',
                messageTitle: 'Too bad',
            };
            return returnObject;
        } else {
            returnObject = {
                passed: true,
                messageBody: '',
                messageTitle: '',
            };
            return returnObject;
        }
    }

    private tileCheck(tile, user) {
        let returnObject = {
            passed: false,
            messageBody: '',
            messageTitle: '',
        };

        const activePlayer = this.players[this.currentPlayerIndex];
        const hasDoodle = this.hasDoodle();

        if (user.userIndex !== this.currentPlayerIndex) {
            console.log("It's not your turn.");
            returnObject = {
                passed: false,
                messageBody:
                    "You'll have to wait untill it's your turn<br>",

                messageTitle: 'ahYes, the rules!',
            };

            return returnObject;

        } else if (activePlayer.fixedDiceScore < 21) {
            returnObject = {
                passed: false,
                messageBody: 'you will have to throw a higher dice score',
                messageTitle: 'Are you okay?',
            };

            return returnObject;

        } else if (!hasDoodle) {
            returnObject = {
                passed: false,
                messageBody:
                    'You need at least one doodle if you want to pick a tile',
                messageTitle: 'ahYes, the rules!',
            };

            return returnObject;

        } else if (tile.active === false) {
            returnObject = {
                passed: false,
                messageBody: 'this tile is not available for you to take',
                messageTitle: 'you can always try...',
            };

            return returnObject;

        } else if (tile.owner === activePlayer.name) {
            returnObject = {
                passed: false,
                messageBody: "you can not take your own tile'",
                messageTitle: 'Smart! or something',
            };
            return returnObject;

        } else if (activePlayer.fixedDiceScore > tile.value) {
            returnObject = {
                passed: false,
                messageBody:
                    "sorry, you will have to select a lower value tile'",
                messageTitle: 'ahYes, the Rules!',
            };
            return returnObject;

        } else if (activePlayer.fixedDiceScore < tile.value) {
            returnObject = {
                passed: false,
                messageBody:
                    "sorry, you will have to select a higher value tile'",
                messageTitle: 'ahYes, the Rules!',
            };

            return returnObject;

        } else {
            returnObject = {
                passed: true,
                messageBody: "'you can not pick a tile at this point'",
                messageTitle: 'Are you okay?',
            };

            return returnObject;
        }
    }

    private loseRound(user) {
        // FIRST! return top tile from players stack

        this.players[this.currentPlayerIndex].playing = false;

        if (this.players[this.currentPlayerIndex].playersTiles.length > 0) {
            const removedTile = this.players[
                this.currentPlayerIndex
            ].playersTiles.pop();
            removedTile.owner = 'table';
            removedTile.active = true;
            this.players[this.currentPlayerIndex].doodleScore -=
                removedTile.doodleValue;

            if (this.players[this.currentPlayerIndex].playersTiles.length > 0) {
                this.players[this.currentPlayerIndex].playersTiles[
                    this.players[this.currentPlayerIndex].playersTiles.length -
                        1
                ].active = true;
            }

            const tileValues = this.tiles.map((tile) => tile.value);
            const index = (array, value) => {
                let low = 0;
                let high = array.length;
                while (low < high) {
                    const mid = (low + high) >>> 1;
                    if (array[mid] < value.value) {
                        low = mid + 1;
                    } else {
                        high = mid;
                    }
                }
                return low;
            };
            this.tiles.splice(index(tileValues, removedTile), 0, removedTile);
        }

        // then! turn highest tile on the table
        const activeTiles = this.tiles.filter((tile) => tile.active === true);
        activeTiles[activeTiles.length - 1].active = false;

        this.players[this.currentPlayerIndex].playing = false;
        this.players[this.currentPlayerIndex].canFixDice = false;
        this.players[this.currentPlayerIndex].canThrowDice = false;
        this.players[this.currentPlayerIndex].fixedDiceScore = 0;

        this.fixedDice = [];
        this.allDice = [];

        this.setNextPlayer(user);
    }

    private getAllDiceImage() {
        let image = `<div style="display: flex; flex-wrap:wrap">`;
        this.allDice.forEach((die) => {
            if (die.value === 6) {
                image += `<div style="height: 20px; width: 20px; background-color: whitesmoke; border: 1px solid black; border-radius:3px;" class="doodle"><img style="height: 100%; width: 100%;"; src="/assets/doodles/doodle.png" alt="" /></div>`;
            } else {
                image += `<div class="fixed-dice" style="display: flex; justify-content: center; align-items: center;
                width: 20px;height: 20px;border-radius: 5px;border: 1px solid black;position: relative;
                background-color: whitesmoke;">
                    ${die.value}
                </div>`;
            }
        });
        image += '</div>';
        return image;
    }

    private getFixedDiceImage() {
        let image = `<div class="dice-cont" style="display: flex; flex-wrap:wrap">`;
        this.fixedDice.forEach((die) => {
            if (die.value === 6) {
                image += `<div style=""><div style="height: 20px; width: 20px; background-color: whitesmoke; border: 1px solid black; border-radius:3px;" class="doodle"><img style="height: 100%; width: 100%;"; src="/assets/doodles/doodle.png" alt="" /></div></div>`;
            } else {
                image += `<div class="fixed-dice" style="display: flex; justify-content: center; align-items: center;
                width: 20px;height: 20px;border-radius: 5px;border: 1px solid black;position: relative;
                background-color: whitesmoke;">
                    ${die.value}
                </div>`;
            }
        });
        image += '</div>';
        return image;
    }

    private getDieStyle(value) {
        let style;
        switch (value) {
            case 1:
                style = `top: calc(50% - 5px);
                    left: calc(50% - 5px);
                    display: inline-block;`;

                break;
            case 2:
                style = `top: calc(50% + 7.5px);
                    left: calc(50% - 17.5px);
                    display: inline-block;
                    boxShadow: 25px -25px black;`;
                break;
            case 3:
                style = `top: calc(50% - 5px);
                    left: 'calc(50% - 5px);
                    display: inline-block;
                    boxShadow: -12.5px 12.5px black, 12.5px -12.5px black;`;

                break;
            case 4:
                style = `top: calc(50% + 7.5px);
                    left: calc(50% - 17.5px);
                    display: inline-block;
                    boxShadow: 25px 0px black, 0px -25px black, 25px -25px black;`;
                break;
            case 5:
                style = `top: calc(50% - 5px);
                    left: calc(50% - 5px);
                    display: inline-block;
                    boxShadow: 12.5px 12.5px black, -12.5px 12.5px black, 12.5px -12.5px black, -12.5px -12.5px black;`;
                break;
            default:
                break;
        }
        return style;
    }

    public checkForWin() {
        const returnObject = {
            passed: false,
            messageBody: '',
        };
        if (this.tiles.filter((tile) => tile.active).length === 0) {
            this.players.forEach((player) => (player.playing = false));
            let opponentIndex: number;

            this.currentPlayerIndex === 0
                ? (opponentIndex = 1)
                : (opponentIndex = 0);
            if (
                this.players[this.currentPlayerIndex].doodleScore <
                this.players[opponentIndex].doodleScore
            ) {
                returnObject.messageBody =
                    'player ' +
                    this.players[this.currentPlayerIndex].name +
                    ' won!!!';
            } else if (
                this.players[this.currentPlayerIndex].doodleScore <
                this.players[opponentIndex].doodleScore
            ) {
                returnObject.messageBody =
                    'player ' +
                    this.players[this.currentPlayerIndex].name +
                    ' won!!!';
            } else {
                returnObject.messageBody =
                    "It's a tie! You both collected the same amount of doodles";
            }

            returnObject.passed = true;

            return returnObject;
        } else {
            returnObject.passed = false;
            return returnObject;
        }
    }

    // ***** checkVariables

    private getThrownDiceSets () {
        const occurrences = this.getNotPossessedValues().reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }, {});

        return occurrences
    }

    private getHigestTileValue() {
        let activeTiles = this.getActiveTiles();
        let highestTile = Math.max.apply(null, activeTiles);

        return highestTile;
    }

    private getDistanceToOverThrow(){
        let distanceValue;
        distanceValue = this.getHigestTileValue() - this.players[this.currentPlayerIndex].fixedDiceScore;

        return distanceValue;
    }

    private hasDoodle() {
        if (this.getFixedValues().includes(6)) {
            return true;
        } else {
            return false;
        }
    }

    private threwDoodle() {
        if (Object.keys(this.getThrownDiceSets()).includes("6")) {
            return true
        } else {
            return false
        }
    }

    private getFixedValues() {
        const values = this.fixedDice.map(die => die.value);

        return values;
    }

    private getBoardValues() {
        const values = this.allDice.map(die => die.value);

        return values
    }

    private getPossessedValues() {
        let possessedValues = [];
        this.getBoardValues().forEach((value) => {
            if (this.getFixedValues().includes(value)) {
                possessedValues.push(value);
            } 
        })

        return possessedValues;
    }
    
    private getNotPossessedValues() {
        let notPossessedValues = [];
        this.getBoardValues().forEach((value) => {
            if (!this.getFixedValues().includes(value)) {
                notPossessedValues.push(value);
            } 
        })
        return notPossessedValues
    }

    private getActiveTiles() {
        let activeTiles = [];

        this.players.forEach((player, index) => {
            if (
                index !== this.currentPlayerIndex &&
                player.playersTiles.length > 0
            ) {
                activeTiles.push(
                    player.playersTiles[player.playersTiles.length - 1].value
                );
            }
        });

        this.tiles.forEach((tile) => {
            if (tile.active === true) {
                activeTiles.push(tile.value);
            }
        });

        return activeTiles;
    }

    private newValues() {
        let fixedValues = this.getFixedValues();
        let boardValues = this.getBoardValues()
        let checker = boardValues.every(v => fixedValues.includes(v))
        console.log(checker)
        return checker

    }

    private checkOverThrow(thrownDiceSets, highestTile) {
        let checks = 0;

        for (const times in thrownDiceSets) {
            if (parseInt(times) !== 6) {
                let potentialValue =
                    parseInt(times) * thrownDiceSets[times] +
                    this.players[this.currentPlayerIndex].fixedDiceScore;
                if (potentialValue > highestTile) {
                    checks++;
                }
            } else {
                let potentialValue =
                    5 * thrownDiceSets[times] +
                    this.players[this.currentPlayerIndex].fixedDiceScore;
                if (potentialValue > highestTile) {
                    checks++;
                }
            }
        }

        if (checks === Object.keys(thrownDiceSets).length) {
            return true;
        } else {
            return false;
        }
    }

    private safeToFix(): boolean {
        let options = 0;
        for (const [key, value] of Object.entries(this.getThrownDiceSets())) {

            let diceValue = value
            if(value === 6){
                diceValue = 5
            }
            console.log(key + " times " + value)
            if (this.hasDoodle() && this.getNotPossessedValues().includes(Number(key)) && Number(key) * Number(diceValue) + this.players[this.currentPlayerIndex].fixedDiceScore < this.getHigestTileValue()) {
                console.log(key + " times " + diceValue + " is an option with a collected Doodle")
                options++
            }
            if (!this.hasDoodle() && this.getNotPossessedValues().includes(Number(key)) && Number(key) * Number(diceValue) + this.players[this.currentPlayerIndex].fixedDiceScore - 5 < this.getHigestTileValue()) {
                console.log(key + " times " + diceValue + " is an option without a collected Doodle")
                options++
            }
        }
        console.log("options: " + options)
        if (options > 0) {
            return true
        } else {
            return false
        }
    }
}

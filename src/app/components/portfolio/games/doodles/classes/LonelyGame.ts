import { Player } from '../interface/player';
import { Tile } from '../interface/tile';
import { ModalService } from 'src/app/services/modal.service';

export class LonelyGame {
    public currentPlayerIndex = 0;
    public players = [];
    public allDice = [];
    public fixedDice = [];

    constructor(public tiles: Tile[], private ModalService: ModalService) {}

    public startGame(id) {
        this.players[id].playing = true;
        this.currentPlayerIndex = id;
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

    public throwDice(playerId) {
        // this function is difficult to test for I'm playing from both perspectives
        // if (this.players[playerId].playing === false) {
        //     this.ModalService.setBody("It's is not your turn yet.");
        //     this.ModalService.setTitle('patience please');
        // }

        if (
            this.players[playerId].playing === true &&
            this.players[playerId].canThrowDice === false
        ) {
            this.ModalService.setBody(
                'You need to pick dice before you can do anything else'
            );
            this.ModalService.setTitle('Reminder');
            this.ModalService.createModal();
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
            if (check.passed === false) {
                this.ModalService.setBody(check.messageBody);
                this.ModalService.setTitle(check.messageTitle);
                this.ModalService.createModal();

                this.loseRound();
            } else if ((check.passed = true)) {
                this.players[this.currentPlayerIndex].canThrowDice = false;
                this.players[this.currentPlayerIndex].canFixDice = true;
            } else {
                this.ModalService.setBody(check.messageBody);
                this.ModalService.setTitle(check.messageTitle);
                this.ModalService.createModal();
            }
        }
    }

    // ******* throwCheckerrr

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
            console.log("you cant throw anymore.")
            this.players[this.currentPlayerIndex].canThrowDice = false;
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
                    this.players[this.currentPlayerIndex].fixedDiceScore +
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
                    this.players[this.currentPlayerIndex].fixedDiceScore +
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

    public selectDice(playerId, value) {
        if (this.players[this.currentPlayerIndex].canFixDice === true) {
            this.allDice.forEach((element) => {
                if (element.value === value && element.fixed === false) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }
    }

    public deselectDice() {
        this.allDice.forEach((die) => (die.selected = false));
    }

    public fixDice(playerId, value) {
        let check = this.fixDiceCheck(value);

        if (check.passed === false) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
        } else {
            // then fix all dice with value value
            this.allDice.forEach((element) => {
                if (element.value === value) {
                    // add fixed value to fixedDiceScore
                    if (element.value === 6) {
                        this.players[playerId].fixedDiceScore += 5;
                    } else {
                        this.players[playerId].fixedDiceScore += element.value;
                    }
                    element.selected = false;
                    element.fixed = true;
                    this.fixedDice.push(element);
                }

                this.players[playerId].canFixDice = false;
                this.players[playerId].canThrowDice = true;
                this.allDice = [];
            });
        }
    }

    public pickTile(playerId, tile) {
        // in ProdMode this playerId needs to checkOut with the player that is currently playing

        let check = this.tileCheck(tile);
        console.log(check);
        if (check.passed === false) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
        } else {
            // picking a tile from the other player:
            if (
                tile.owner !== 'table' &&
                tile.owner !== this.players[playerId].name
            ) {
                // before adding a new top tile to the stack make all below inactive
                this.players[playerId].playersTiles.forEach((element) => {
                    element.active = false;
                });
                // take tile from opponent
                let robbedPlayer: Player[] = this.players.filter(
                    (player) => player.name === tile.owner
                );
                console.log(robbedPlayer);
                tile.owner = this.players[this.currentPlayerIndex].name;
                this.players[this.currentPlayerIndex].playersTiles.push(tile);
                this.players[this.currentPlayerIndex].doodleScore +=
                    tile.doodleValue;

                robbedPlayer[0].doodleScore -= tile.doodleValue;
                robbedPlayer[0].playersTiles.pop();

                // if robbedPlayer has remaining tiles => activate top tile
                if (robbedPlayer[0].playersTiles.length > 0) {
                    robbedPlayer[0].playersTiles[
                        robbedPlayer[0].playersTiles.length - 1
                    ].active = true;
                }
            } else {
                // pick tile from table
                const tileIndex = this.tiles
                    .map((tile) => tile.value)
                    .indexOf(tile.value);
                const selectedTile = this.tiles[tileIndex];

                selectedTile.owner = this.players[this.currentPlayerIndex].name;
                this.tiles.splice(tileIndex, 1);
                this.players[this.currentPlayerIndex].playersTiles.push(
                    selectedTile
                );
                this.players[this.currentPlayerIndex].doodleScore +=
                    tile.doodleValue;
            }

            this.players[this.currentPlayerIndex].playing = false;
            this.players[this.currentPlayerIndex].canFixDice = false;
            this.players[this.currentPlayerIndex].canThrowDice = false;
            this.players[this.currentPlayerIndex].fixedDiceScore = 0;

            this.fixedDice = [];

            this.setNextPlayer();

            this.players[this.currentPlayerIndex].playing = true;
            this.players[this.currentPlayerIndex].canThrowDice = true;
            console.log(this);
        }
    }

    private setNextPlayer() {
        // game should be functional for four players...
        // all players stay active untill end of the game but a player can lose connection...

        this.players[this.currentPlayerIndex].playing = false;
        if (this.currentPlayerIndex === this.players.length - 1) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }
        this.players[this.currentPlayerIndex].playing = true;
        this.players[this.currentPlayerIndex].canThrowDice = true;

        // if player is inactive: init setNextPlayer from component for logging
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

    private tileCheck(tile) {
        let returnObject = {
            passed: false,
            messageBody: '',
            messageTitle: '',
        };

        //is picking player also the PLAYING player orrrr else

        console.log(tile);
        console.log(this.players[this.currentPlayerIndex].fixedDiceScore);
        if (this.players[this.currentPlayerIndex].fixedDiceScore < 21) {
            returnObject = {
                passed: false,
                messageBody: 'you will have to throw a higher dice score',
                messageTitle: 'Are you okay?',
            };
            return returnObject;
        } else if (this.fixedDice.filter((tile) => tile.doodle).length === 0) {
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
        } else if (tile.owner === this.players[this.currentPlayerIndex].name) {
            returnObject = {
                passed: false,
                messageBody: "you can not take your own tile'",
                messageTitle: 'Smart! or something',
            };
            return returnObject;
        } else if (
            this.players[this.currentPlayerIndex].fixedDiceScore > tile.value
        ) {
            returnObject = {
                passed: false,
                messageBody:
                    "sorry, you will have to select a lower value tile'",
                messageTitle: 'ahYes, the Rules!',
            };
            return returnObject;
        } else if (
            this.players[this.currentPlayerIndex].fixedDiceScore < tile.value
        ) {
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

    private loseRound() {
        // FIRST! return top tile from players stack
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

        this.setNextPlayer();
    }

    private checkForWin() {
        if (this.tiles.filter((tile) => tile.active).length === 0) {
            // check scores against eachother
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

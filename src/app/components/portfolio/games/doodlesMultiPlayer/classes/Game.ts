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
        this.players[firstPlayerIndex].playing = true
        this.currentPlayerIndex = firstPlayerIndex
        this.players[firstPlayerIndex].canThrowDice = true;
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
            this.ModalService.createModal()
        } else if ( this.players[user.userIndex].playing === true && this.players[user.userIndex].canThrowDice === false
        ) {
            this.ModalService.setBody('You need to pick dice before you can do anything else');
            this.ModalService.setTitle('Reminder');
            this.ModalService.createModal()
            return false
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
            console.log(check)
            if (check.passed === false) {
                this.ModalService.setBody(check.messageBody);
                this.ModalService.setTitle(check.messageTitle);
                this.ModalService.createModal();
                this.loseRound(user);

            } else {
                this.players[this.currentPlayerIndex].canThrowDice = false;
                this.players[this.currentPlayerIndex].canFixDice = true;
            }
            return true
        }

    }

    public selectDice(playerId, value):boolean {
        if (this.currentPlayerIndex !== playerId) {
            return false
        } else if (this.players[this.currentPlayerIndex].canFixDice === true) {
            this.allDice.forEach((element) => {
                if (element.value === value && element.fixed === false) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
            return true
        } else {
            return false
        }
    }

    public deselectDice() {
        this.allDice.forEach((die) => (die.selected = false));
    }

    public fixDice(playerId, value):boolean {
        let check = this.fixDiceCheck(value)

         if (check.passed === false || playerId !== this.currentPlayerIndex) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
            return false;
        } else {
            this.deselectDice()

            // then fix all dice with value value
            this.allDice.forEach((element) => {

                if (element.value === value) {
                    // add fixed value to fixedDiceScore
                    if (element.value === 6) {
                        this.players[playerId].fixedDiceScore += 5;
                    } else {
                        this.players[playerId].fixedDiceScore +=
                            element.value;
                    }
                    element.selected = false;
                    element.fixed = true;
                    this.fixedDice.push(element);
                }

                this.players[playerId].canFixDice = false;
                this.players[playerId].canThrowDice = true;
                this.allDice = [];
                
            });
            return true
        }
    }

    public pickTile(tile) {

        let check = this.tileCheck(tile);
        if (check.passed === false) {
            this.ModalService.setBody(check.messageBody);
            this.ModalService.setTitle(check.messageTitle);
            this.ModalService.createModal();
            return false
        } else {
            // picking a tile from the other player:
            if (
                tile.owner !== 'table' &&
                tile.owner !== this.players[this.currentPlayerIndex].name
                ) {
                    
                    // before adding a new top tile to the stack make all below inactive
                this.players[this.currentPlayerIndex].playersTiles.forEach((element) => {
                    element.active = false;
                });
                // take tile from opponent
                let robbedPlayer:Player[] = this.players.filter((player) => player.name === tile.owner)
                console.log(robbedPlayer)
                tile.owner = this.players[this.currentPlayerIndex].name;
                this.players[this.currentPlayerIndex].playersTiles.push(tile);
                this.players[this.currentPlayerIndex].doodleScore += tile.doodleValue;

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
                const tileIndex = this.tiles.map((tile) => tile.value).indexOf(tile.value);
                const selectedTile = this.tiles[tileIndex];

                selectedTile.owner = this.players[this.currentPlayerIndex].name;
                this.tiles.splice(tileIndex, 1);
                this.players[this.currentPlayerIndex].playersTiles.push(selectedTile);
                this.players[this.currentPlayerIndex].doodleScore += tile.doodleValue;
            }

            this.players[this.currentPlayerIndex].playing = false;
            this.players[this.currentPlayerIndex].canFixDice = false;
            this.players[this.currentPlayerIndex].canThrowDice = false;
            this.players[this.currentPlayerIndex].fixedDiceScore = 0;

            this.fixedDice = [];

            this.setNextPlayer(this.players[this.currentPlayerIndex])

            return true
        }

    }

    private setNextPlayer(user) {
        this.players[user.userIndex].playing = false;
        if (this.currentPlayerIndex === this.players.length - 1) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }

        this.players[this.currentPlayerIndex].playing = true;
        this.players[this.currentPlayerIndex].canThrowDice = true;

    }

    private throwCheck() {
        let returnObject = {
            passed: false,
            messageBody: "",
            messageTitle: ""
        }
        let fixedValues = this.fixedDice.map(die => die.value)
        let boardValues = this.allDice.map(die => die.value)
        let possessedValues = [];
        let notPossessedValues = [];
        let topTiles = [];
        
        let checker = (arr, target) => target.every(v => arr.includes(v))

        boardValues.forEach(value => {
            if (fixedValues.includes(value)){
                possessedValues.push(value)
            } else {
                notPossessedValues.push(value)
            }
        })

        this.players.forEach((player, index) => {
            if (index !== this.currentPlayerIndex && player.playersTiles.length > 0 ) {
                topTiles.push(player.playersTiles[player.playersTiles.length - 1].value)
            }
        })
        
        const occurrences = notPossessedValues.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
          }, {});

        const overthrowChecker = ():boolean => {
            let checks = 0;
            let highestValue = Math.max.apply(null, (this.tiles.map(tile => tile.active ? tile.value : 0).concat(topTiles)))
            for (const times in occurrences) {
                if (parseInt(times) !== 6) {
                    let potentialValue = parseInt(times) * occurrences[times] + this.players[this.currentPlayerIndex].fixedDiceScore
                    if (potentialValue > highestValue) {
                        checks ++
                    }
                } else {
                    let potentialValue = 5 * occurrences[times] + this.players[this.currentPlayerIndex].fixedDiceScore
                    if (potentialValue > highestValue) {
                    checks ++
                    }
                }
            }

            if (checks === Object.keys(occurrences).length) {
                console.log("you overthrew")
                return false
            } else {
                console.log("you did not overthrow")
                return true
            }
        }

        if( checker(fixedValues, boardValues)) {
            console.log("unfortunately, you threw only values that you allready collected")
            returnObject = {
                passed: false,
                messageBody: "unfortunately, you threw only values that you allready collected:<br>" + this.getFixedDiceImage() + "<br>and you threw:<br>" + this.getAllDiceImage(),
                messageTitle: "ahYes, the rules!"
            }

            return returnObject
        } else if (!overthrowChecker()) {
            console.log("unfortinately you overthrew all available tile values")

            returnObject = {
                passed: false,
                messageBody: "unfortinately you overthrew all available tile values<br>You allready collected:<br>" + this.getFixedDiceImage() + " = (" +this.players[this.currentPlayerIndex].fixedDiceScore + ")" + "<br>and you threw:<br>" + this.getAllDiceImage(),
                messageTitle: "oh Darn..."
            }

            return returnObject;
        } else if (!possessedValues.includes(6) && notPossessedValues.length === 0) {
            console.log("you dont have a doodle AND no dice left to use.")
            returnObject = {
                passed: false,
                messageBody: "unfortinately you did not collect any Doodles.<br>You allready collected:<br>" + this.getFixedDiceImage() + "<br>and you threw:<br>" + this.getAllDiceImage(),
                messageTitle: "ahYes, the rules!"
            }

            return returnObject;
        } else if (notPossessedValues.length === 0) {
            console.log("you threw values you allready have")
            returnObject = {
                passed: false,
                messageBody: "you threw values you allready have.<br>You allready collected:<br>" + this.getFixedDiceImage() + "<br>and you threw:<br>" + this.getAllDiceImage(),
                messageTitle: "ahYes, the rules!"
            }

            return returnObject;
        } else {
            returnObject = {
                passed: true,
                messageBody: "",
                messageTitle: ""
            }
            return returnObject
        }
    }

    private fixDiceCheck(value) {
        let returnObject = {
            passed: false,
            messageBody: "",
            messageTitle: ""
        }
        // in prodMode also the playerId should be used instead of th currentplayer index.
        let checks = 0;
        let relevantTiles= this.tiles.map(tile => tile.active ? tile.value : 0);

        this.players.forEach((player, index) => {
            if (index !== this.currentPlayerIndex && player.playersTiles.length > 0 ) {
                relevantTiles.push(player.playersTiles[player.playersTiles.length - 1].value)
            }
        })

        let tempScore = this.players[this.currentPlayerIndex].fixedDiceScore;
        this.allDice.forEach((element) => {

            if (element.value === value) {
                if (element.value === 6) {
                    tempScore += 5;
                } else {
                    tempScore +=
                        element.value;
                }
            }
        });

        // check if value is allowed to be fixed
        this.fixedDice.forEach((element) => {
            element.selected = false;
            if (element.fixed === true && element.value === value) {
                console.log(
                    'this value was allready selected, choose another dice'
                );
                checks++;
            }
        });

        if (checks > 0) {
            returnObject = {
                passed: false,
                messageBody: "this value was allready selected. Choose another value",
                messageTitle: "Ahyes, the rules!"
            }
            return returnObject
        } else if (this.players[this.currentPlayerIndex].canFixDice === false) {
            returnObject = {
                passed: false,
                messageBody: "you are not allowed to fix these dice at this point",
                messageTitle: "Ahyes, the rules!"
            }
            return returnObject
        } else if(relevantTiles.every(val => val < tempScore)) {
            returnObject = {
                passed: false,
                messageBody: "With these dice you would have a higher value than any available tile",
                messageTitle: "Too bad"
            }
            return returnObject
        } else {
            returnObject = {
                passed: true,
                messageBody: "",
                messageTitle: ""
            }
            return returnObject
        }
    }

    private tileCheck(tile) {
        let returnObject = {
            passed: false,
            messageBody: "",
            messageTitle: ""
        }

        if (this.players[this.currentPlayerIndex].fixedDiceScore < 21) {
            returnObject = {
                passed: false,
                messageBody: "you will have to throw a higher dice score",
                messageTitle: "Are you okay?"
            }
            return returnObject

        } else if (this.fixedDice.filter(tile => tile.doodle).length === 0) {
            returnObject = {
                passed: false,
                messageBody: "You need at least one doodle if you want to pick a tile",
                messageTitle: "ahYes, the rules!"
            }
            return returnObject

        } else if (tile.active === false) {
            returnObject = {
                passed: false,
                messageBody: "this tile is not available for you to take",
                messageTitle: "you can always try..."
            }
            return returnObject
        
        } else if (tile.owner === this.players[this.currentPlayerIndex].name) {
            returnObject = {
                passed: false,
                messageBody: "you can not take your own tile'",
                messageTitle: "Smart! or something"
            }
            return returnObject
        
        } else if (this.players[this.currentPlayerIndex].fixedDiceScore > tile.value) {
            returnObject = {
                passed: false,
                messageBody: "sorry, you will have to select a lower value tile'",
                messageTitle: "ahYes, the Rules!"
            }
            return returnObject
            
        } else if (this.players[this.currentPlayerIndex].fixedDiceScore < tile.value) {
            returnObject = {
                passed: false,
                messageBody: "sorry, you will have to select a higher value tile'",
                messageTitle: "ahYes, the Rules!"
            }
            return returnObject

        } else {
            returnObject = {
                passed: true,
                messageBody: "'you can not pick a tile at this point'",
                messageTitle: "Are you okay?"
            }
            return returnObject
        }
    }

    private loseRound(user) {
        // FIRST! return top tile from players stack

        this.players[this.currentPlayerIndex].playing = false;


        if (this.players[this.currentPlayerIndex].playersTiles.length > 0) {
            const removedTile = this.players[this.currentPlayerIndex].playersTiles.pop();
            removedTile.owner = "table";
            removedTile.active = true;
            this.players[this.currentPlayerIndex].doodleScore -= removedTile.doodleValue;

            if (this.players[this.currentPlayerIndex].playersTiles.length > 0) {
                this.players[this.currentPlayerIndex].playersTiles[this.players[this.currentPlayerIndex].playersTiles.length - 1].active = true;
            }

            const tileValues = this.tiles.map(tile => tile.value);
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
        const activeTiles = this.tiles.filter(tile => tile.active === true);
        activeTiles[activeTiles.length - 1].active = false;

        this.players[this.currentPlayerIndex].playing = false;
        this.players[this.currentPlayerIndex].canFixDice = false;
        this.players[this.currentPlayerIndex].canThrowDice = false;
        this.players[this.currentPlayerIndex].fixedDiceScore = 0;

        this.fixedDice = [];
        this.allDice = [];

        this.setNextPlayer(user)

    }

    private getAllDiceImage() {
        let image = `<div style="display: flex; flex-wrap:wrap">`
        this.allDice.forEach(die => {
            if(die.value === 6){
                image+= `<div style="height: 20px; width: 20px; background-color: whitesmoke; border: 1px solid black; border-radius:3px;" class="doodle"><img style="height: 100%; width: 100%;"; src="/assets/doodles/doodle.png" alt="" /></div>`
            } else {
                image += `<div class="fixed-dice" style="display: flex; justify-content: center; align-items: center;
                width: 20px;height: 20px;border-radius: 5px;border: 1px solid black;position: relative;
                background-color: whitesmoke;">
                    ${die.value}
                </div>`;
            }
            
        })
        image +='</div>'
        return image
    }
    
    private getFixedDiceImage() {
        let image = `<div class="dice-cont" style="display: flex; flex-wrap:wrap">`
        this.fixedDice.forEach(die => {
            console.log(die)
            if(die.value === 6){
                image+= `<div style=""><div style="height: 20px; width: 20px; background-color: whitesmoke; border: 1px solid black; border-radius:3px;" class="doodle"><img style="height: 100%; width: 100%;"; src="/assets/doodles/doodle.png" alt="" /></div></div>`
            } else {
                image += `<div class="fixed-dice" style="display: flex; justify-content: center; align-items: center;
                width: 20px;height: 20px;border-radius: 5px;border: 1px solid black;position: relative;
                background-color: whitesmoke;">
                    ${die.value}
                </div>`;

            }
        })
        image +='</div>'
        return image
    }

    private getDieStyle(value) {
        let style;
        switch (value) {
            case 1:
                style = `top: calc(50% - 5px);
                    left: calc(50% - 5px);
                    display: inline-block;`

                break;
            case 2:
                style =`top: calc(50% + 7.5px);
                    left: calc(50% - 17.5px);
                    display: inline-block;
                    boxShadow: 25px -25px black;`
                break;
            case 3:
                style = `top: calc(50% - 5px);
                    left: 'calc(50% - 5px);
                    display: inline-block;
                    boxShadow: -12.5px 12.5px black, 12.5px -12.5px black;`

                break;
            case 4:
                style = `top: calc(50% + 7.5px);
                    left: calc(50% - 17.5px);
                    display: inline-block;
                    boxShadow: 25px 0px black, 0px -25px black, 25px -25px black;`
                break;
            case 5:
                style =`top: calc(50% - 5px);
                    left: calc(50% - 5px);
                    display: inline-block;
                    boxShadow: 12.5px 12.5px black, -12.5px 12.5px black, 12.5px -12.5px black, -12.5px -12.5px black;`
                break;
                default:
                    break;
            }
            return style;
    }

    public checkForWin() {
        const returnObject = {
            passed: false,
            messageBody: "",
        }
        console.log("checking for win")
        console.log(this.tiles.map(tile => tile.active))
        console.log(this.tiles.map(tile => tile.active).length)
            if (this.tiles.filter(tile => tile.active).length === 0) {
                this.players.forEach(player => player.playing = false)
                let opponentIndex:number;

                this.currentPlayerIndex === 0 ? opponentIndex = 1 :opponentIndex = 0
                if (this.players[this.currentPlayerIndex].doodleScore < this.players[opponentIndex].doodleScore){
                    returnObject.messageBody = "player " + this.players[this.currentPlayerIndex].name + " won!!!"
                } else if (this.players[this.currentPlayerIndex].doodleScore < this.players[opponentIndex].doodleScore) {
                    returnObject.messageBody = "player " + this.players[this.currentPlayerIndex].name + " won!!!"
                } else {
                    returnObject.messageBody = "It's a tie! You both collected the same amount of doodles"
                }
                
                returnObject.passed = true


                return returnObject
            } else {
                returnObject.passed = false
                return returnObject
            }
    }
}

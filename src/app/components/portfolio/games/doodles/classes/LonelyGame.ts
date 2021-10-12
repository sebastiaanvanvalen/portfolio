import { Player } from '../interface/player';
import { Tile } from '../interface/tile';
import { ModalService } from 'src/app/services/modal.service';

export class LonelyGame {
    
    private gameStatus = 'empty';
    private difficulty = 'simple';
    private nrOfPlayers = 2;
    public currentPlayerIndex = 0;
    public players = [];
    public allDice = [];
    public fixedDice = [];
    private message = {
        type: 'none',
        receiver: 'none',
        message: 'none',
        timer: 'none',
        active: false,
    };

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
            this.ModalService.setBody('You need to pick dice before you can do anything else');
            this.ModalService.setTitle('Reminder');
            this.ModalService.createModal()
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
            } else {
                this.players[this.currentPlayerIndex].canThrowDice = false;
                this.players[this.currentPlayerIndex].canFixDice = true;
            }
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
        console.log(this)

        let check = this.fixDiceCheck(value)
        console.log(check)
        console.log(playerId)

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
            console.log(this)
        }
    }

    public pickTile(playerId, tile) {

        // in ProdMode this playerId needs to checkOut with the player that is currently playing

        let check = this.tileCheck(tile);
        console.log(check)
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

            this.setNextPlayer()

            this.players[this.currentPlayerIndex].playing = true;
            this.players[this.currentPlayerIndex].canThrowDice = true;
            console.log(this)
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

    private toggleCanThrowDice(playerId) {
        this.players[playerId].canThrowDice = !this.players[playerId]
            .canThrowDice;
    }

    private toggleCanFixDice(playerId) {
        this.players[playerId].canFixDice = !this.players[playerId].canFixDice;
    }

    private setWinstatus(playerId) {
        this.players[playerId].winStatus = true;
    }

    private setDoodleScore(playerId, func, amount) {
        if (func === 'sub') {
            this.players[playerId].doodleScore -= amount;
        } else {
            this.players[playerId].doodleScore += amount;
        }
    }

    private setFixedDiceScore(playerId, func, amount) {
        if (func === 'sub') {
            this.players[playerId].fixedDiceScore -= amount;
        } else {
            this.players[playerId].fixedDiceScore += amount;
        }
    }

    private throwCheck() {
        let returnObject = {
            passed: false,
            messageBody: "",
            messageTitle: ""
        }

        let fixedDice = this.fixedDice.map(dice => dice.value)
        let thrownDice = this.allDice.map(dice => dice.value)
        let checker = (arr, target) => target.every(v => arr.includes(v))

        // all out of dice and no doodle
        if ( this.fixedDice.filter(dice => dice.doodle === true).length === 0 && this.fixedDice.length === 8 ) {
            returnObject = {
                passed: false,
                messageBody: "unfortinately you threw all dice without collecting a doodle. Good luck next time.",
                messageTitle: "ahYes, the rules!"
            }

            return returnObject;

        // there are no more dice to be thrown & if the player hás a doodle but the diceValue doens't match a tile on the tab
        } else if ( this.fixedDice.length === 8 &&  this.fixedDice.filter(tile => tile.doodle === true).length > 0 && !this.tiles.map(tile => tile.active ? tile.value : 0).includes(this.players[this.currentPlayerIndex].fixedDiceScore)
        ) {
            let checkTilesOtherPlayers = 0;
            this.players.forEach((player, index) => {
                if (index !== this.currentPlayerIndex) {
                    let lastTile = player.playerTiles.pop();
                    if (lastTile.value === this.players[this.currentPlayerIndex].diceScore) {
                        checkTilesOtherPlayers ++
                    }
                }
            })
            if (checkTilesOtherPlayers !== 0) {

                returnObject = {
                    passed: false,
                    messageBody: "you are out of dice and their value does not match any tile on the table nor any of your opponents top tiles.",
                    messageTitle: "ahYes, the rules!"
                }
                return returnObject
            } 

        // the diceScore is higher than any tile on the table
        } else if(this.tiles.map(tile => tile.active ? tile.value : 0).every(val => val < this.players[this.currentPlayerIndex].fixedDiceScore)) {

            // check all top tiles of the other players
            let checkTilesOtherPlayers = 0;
            this.players.forEach((player, index) => {
                if (index !== this.currentPlayerIndex) {
                    if(player.playerTiles.length > 0){
                        let lastTile = player.playerTiles.pop();
                        if (lastTile.value < this.players[this.currentPlayerIndex].diceScore) {
                            checkTilesOtherPlayers ++
                        }
                    }

                }
            })
            if (checkTilesOtherPlayers === 0) {
                returnObject ={
                    passed: false,
                    messageBody: "yes, you have a doodle but you are out of dice. And their value does not match a tile. It is your opponents turn",
                    messageTitle: "ahYes, the rules!"
                }

                return returnObject
            }

            // player threw only values he allready collected
        } else if(checker(fixedDice, thrownDice)) {
            returnObject = {
                passed: false,
                messageBody: "unfortunately, you threw only values that you allready collected",
                messageTitle: "ahYes, the rules!"
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

    private fixDiceCheck(value) {
        let returnObject = {
            passed: false,
            messageBody: "",
            messageTitle: ""
        }
        // in prodMode also the playerId should be used instead of th currentplayer index.
        let checks = 0;

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

        //is picking player also the PLAYING player orrrr else

        console.log(tile)
        console.log(this.players[this.currentPlayerIndex].fixedDiceScore)
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

    private loseRound() {
        // FIRST! return top tile from players stack
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

        this.setNextPlayer()

    }

    private checkForWin() {
        if( this.tiles.filter(tile => tile.active).length === 0) {
            // check scores against eachother
        }
    }
}

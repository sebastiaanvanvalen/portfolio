import { Player } from './player';
import { Tile } from './tile';
import { Die } from './die';
import { Message } from './message';
export interface GameVar {
    currentPlayerIndex: number;
    players: Player[];
    tiles: Tile[];
    allDice: Die[];
    fixedDice: Die[];
}

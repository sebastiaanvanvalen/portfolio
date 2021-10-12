import { User } from './user';
import { GameVar } from '../../doodles/interface/gamevar';
import { Player } from '../classes/Player';
import { Die } from '../../doodles/interface/die';
import { Tile } from './tile';

export interface UpdateObject {
    user:User;
    message: string;
    players: Player[];
    currentPlayerIndex: number;
    allDice: Die[];
    fixedDice: Die[];
    tiles: Tile[];
    updatedOn: string;
}

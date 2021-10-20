import { User } from './user'
import { Player } from '../../doodles/classes/Player'
import { Die } from '../../doodles/interface/die'
import { Tile } from '../../doodles/interface/tile'

export interface UpdateObject {
    sender: User;
    type: string;
    game: {
        players: Player[]
        currentPlayerIndex: number,
        allDice: Die[]
        fixedDice: Die[];
        tiles: Tile[];
    };
    updatedOn: string;
}

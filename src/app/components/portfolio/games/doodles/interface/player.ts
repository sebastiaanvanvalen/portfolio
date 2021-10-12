import { Tile } from './tile';

export interface Player {
    id: string;
    name: string;
    playing: boolean;
    canThrowDice: boolean;
    canFixDice: boolean;
    winStatus: boolean;
    playersTiles: Tile[];
    fixedDiceScore: number;
    doodleScore: number;
    active: boolean;
}
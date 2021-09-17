import { BallInt } from './BallInt'

export interface CanvasObject {
    'balls': any[];
    'ballCounter': number;
    'radius': number;
    'mouseX': number;
    'mouseY': number;
    'style': string;
    'colorMode': string;
    'collide': boolean;
    'coloring': boolean;
}

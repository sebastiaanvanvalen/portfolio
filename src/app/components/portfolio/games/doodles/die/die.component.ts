import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Die } from '../interface/die';
import { LonelyGame } from '../classes/LonelyGame';

@Component({
    selector: 'app-doodles-die',
    templateUrl: './die.component.html',
    styleUrls: ['./die.component.scss'],
})
export class DoodlesDieComponent implements OnInit {
    @Input() lonelyGame: LonelyGame;
    @Input() die: Die;

    constructor() {}

    ngOnInit() {}


    public styleMe(value) {
        let style;
        switch (value) {
            case 1:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                };
                break;
            case 2:
                style = {
                    top: 'calc(50% + 7.5px)',
                    left: 'calc(50% - 17.5px)',
                    display: 'inline-block',
                    boxShadow: '25px -25px black',
                };
                break;
            case 3:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                    boxShadow: '-12.5px 12.5px black, 12.5px -12.5px black',
                };
                break;
            case 4:
                style = {
                    top: 'calc(50% + 7.5px)',
                    left: 'calc(50% - 17.5px)',
                    display: 'inline-block',
                    boxShadow:
                        '25px 0px black, 0px -25px black, 25px -25px black',
                };
                break;
            case 5:
                style = {
                    top: 'calc(50% - 5px)',
                    left: 'calc(50% - 5px)',
                    display: 'inline-block',
                    boxShadow:
                        '12.5px 12.5px black, -12.5px 12.5px black, 12.5px -12.5px black, -12.5px -12.5px black',
                };
                break;
            case 6:
                style = {};
                break;
            default:
                break;
        }
        return style;
    }
}

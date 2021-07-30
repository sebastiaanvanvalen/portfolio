import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ColorThemeService } from 'src/app/services/color-theme.service';

@Component({
    selector: 'app-color-theme',
    templateUrl: './color-theme.component.html',
    styleUrls: ['./color-theme.component.scss'],
    animations: [
        trigger('enterAnimation', [
            transition(':enter', [
                style({ height: '0px',  opacity: 0 }),
                animate('0ms', style({ height: '34px', opacity: 1 })),
            ]),
            transition(':leave', [
                style({ height: '34px', opacity: 1 }),
                animate('0ms', style({ height: '0px', opacity: 0 })),
            ]),
        ]),
    ],
})

export class ColorThemeComponent implements OnInit {
    showBox = false;
    theme = this.colorThemeService.getStoredTheme();
    constructor(private colorThemeService: ColorThemeService) {}

    ngOnInit() {
        this.theme = this.colorThemeService.getStoredTheme();
    }

    onClickedOutside(event: Event) {
        this.showBox = false;
    }

    public setColorTheme() {
        if (this.theme === 'light'){
            this.theme = 'dark'
        } else {
            this.theme = 'light'
        }
        this.colorThemeService.storeTheme(this.theme);
    }
}

import { Injectable } from '@angular/core';
import { ThemeInterface, light, dark } from '../modules/themeInterface';

@Injectable({
    providedIn: 'root',
})

export class ColorThemeService {
    private active: ThemeInterface = light;
    private availableThemes: ThemeInterface[] = [light, dark];

    constructor() {}

    public getStoredTheme(): string {
        if (localStorage.getItem('colorTheme')) {
            this.processTheme();

            return localStorage.getItem('colorTheme');

        } else {
            this.processTheme();

            return 'light';
        }
    }

    public storeTheme(theme) {
        localStorage.setItem('colorTheme', theme);
        this.processTheme();
    }

    private processTheme(): void {
        if(localStorage.getItem('colorTheme') === 'light') {
            this.active = this.availableThemes[0];
        } else {
            this.active = this.availableThemes[1];
        }

        Object.keys(
            this.active.properties).forEach((property, index) => {
                document.documentElement.style.setProperty(
                    property,
                    this.active.properties[property]
                );
            })
        ;
    }
}

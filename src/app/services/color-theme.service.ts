import { Injectable } from '@angular/core';
import { ThemeInterface, light, dark } from '../components/color-theme/interfaces/themeInterface';

@Injectable({
    providedIn: 'root',
})

export class ColorThemeService {
    private activeThemeInterface: ThemeInterface = light;
    private availableThemes: ThemeInterface[] = [light, dark];

    constructor() {}

    public getStoredTheme(): string {
        if (localStorage.getItem('colorTheme')) {
            this.processTheme();
            
            return localStorage.getItem('colorTheme');
            
        } else {
            localStorage.setItem('colorTheme', "light");
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
            this.activeThemeInterface = this.availableThemes[0];
        } else {
            this.activeThemeInterface = this.availableThemes[1];
        }

        Object.keys(
            this.activeThemeInterface.properties).forEach((property, index) => {
                document.documentElement.style.setProperty(
                    property,
                    this.activeThemeInterface.properties[property]
                );
            })
        ;
    }
}

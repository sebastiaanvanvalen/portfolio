export interface ThemeInterface {
    name: string;
    properties: any;
}

export const light: ThemeInterface = {
    name: "light",
    properties: {
        "--global-primary": "rgb(96, 145, 161)",
        "--global-secondary": "rgb(194, 136, 11)",

        "--textColor1": "grey",
        "--textColor2": "black",

        "--colorThemeCompText": "white",
        "--colorThemeCompBG": "var(--global-primary)",

        "--buttonBGColor": "rgb(96, 145, 161)",
        "--buttonTextColor": "white",

        "--boxShadowColor": "0px 0px 20px 1px grey",
        "--boxShadowColorDD": "0 8px 8px -2px grey",

        "--backgroundColor1": "white",
        "--backgroundColor2": "lightgrey",
    }
}

export const dark: ThemeInterface = {
    name: "dark",
    properties: {
        "--global-primary": "rgb(94, 90, 90)",
        "--global-secondary": "rgb(177, 176, 166)",

        "--textColor1": "lightgrey",
        "--textColor2": "#121212",

        "--colorThemeCompText": "rgb(200, 177, 177)",
        "--colorThemeCompBG": "rgb(133, 10, 10)",

        "--buttonBGColor": "grey",
        "--buttonTextColor": "white",

        "--boxShadowColor": "0px 0px 10px 5px rgb(68, 68, 68)",
        "--boxShadowColorDD": "0 8px 8px -2px rgb(68, 68, 68)",

        "--backgroundColor1": "#121212",
        "--backgroundColor2": "#121212",
    }

}
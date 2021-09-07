import { rgb } from 'd3'

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

        "--buttonInfoBGColor": "#1E65A7",

        "--boxShadowColor": "0px 0px 20px 1px grey",
        "--boxShadowColorDD": "0 8px 8px -2px grey",

        "--backgroundColor1": "white",
        "--backgroundColor2": "lightgrey",

        "--slotBackgroundColor": "#9b9b7a",
        // "--slotMessageBackground": "linear-gradient(#f3e9dc, #ccd5ae)",
        "--slotMessageBackground": "linear-gradient(#709775, #415d43)",
        "--messageColor": "rgb(73, 60, 2)",
        "--buttonColor": "linear-gradient(#709775, #415d43)",
        "--buttonHoverColor": "linear-gradient(#4d6a6d, #798478)",
        "--slotAccent": "rgb(248, 171, 27)",
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

        "--buttonInfoBGColor": "#699FA1",


        "--boxShadowColor": "0px 0px 10px 5px rgb(68, 68, 68)",
        "--boxShadowColorDD": "0 8px 8px -2px rgb(68, 68, 68)",

        "--backgroundColor1": "#121212",
        "--backgroundColor2": "#121212",

        "--slotBackgroundColor": "rgb(49, 37, 23)",
        "--slotMessageBackground": "linear-gradient(rgb(31, 30, 30), rgb(6, 5, 5))",
        "--messageColor": "rgb(247, 231, 162)",
        "--buttonColor": "linear-gradient(rgb(197, 83, 83),rgb(126, 39, 39))",
        "--buttonHoverColor": "linear-gradient(orange, rgb(124, 81, 0))",
        "--slotAccent": "rgb(255, 215, 0)",
    }
}
export class Player {
    public playing = false;
    private canThrowDice = true;
    private canFixDice = true;
    private winStatus = false;
    private playersTiles = [];
    private fixedDiceScore = 0;
    private doodleScore = 0;
    private active = true;

    constructor(private id:string, private name:string) {
        this.id = id;
        this.name = name;
    }

}

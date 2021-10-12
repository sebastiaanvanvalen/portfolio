export class Player {
    public playing = false;
    private canThrowDice = true;
    private canFixDice = true;
    private winStatus = false;
    private playersTiles = [];
    private fixedDiceScore = 0;
    private doodleScore = 0;
    private active = true;

    constructor(public userIndex:string, public name:string, public userId:string) {
        this.userIndex = userIndex;
        this.name = name;
        this.userId = userId;
    }

}

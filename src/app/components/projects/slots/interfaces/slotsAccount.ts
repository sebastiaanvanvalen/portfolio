export interface slotsAccount {
    startingAccount: number;
    currentAccount: number;
    bet: number;
    
    
    currentWin: number;
    currency: string;
    
    // shows which reels are on HOLD
    holdedReels: boolean[];
    
    
    // spinValues: number[];
    
    // is set when reels are turning, when hOrT is initiatied and when a message is played. At this time the player cant use the PLAY button so messages e.g have the time to play in good order.
    spin: boolean;
    
    // holding is set when you push HOLD. But also after a win so you cant "auto-win" for ever
    holding: boolean;
    
    // is set somewhere in the hierarchy tree. When a win is found other checks are stopped from being excecuted.
    win: boolean;
    
    // when headsOrTails (hOrT) is true, the game stops until the player made a gamble.
    hOrT: boolean;
    
    // is set when game starts with more than 1 coin. Is set to false when account is empty
    playing: boolean;

    // chosen slot on each reel.
    reelSpin: number[];

    // three arrays with each visible row on the screen
    reelChart: number[][];

    // array with all slot values. (for checking 3 questionmarks)
    allSlots: number[]
}

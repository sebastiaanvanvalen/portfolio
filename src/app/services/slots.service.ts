import { Injectable } from '@angular/core';
import { slotsAccount } from '../components/projects/slots/models/slotsAccount';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

    slotsAccount = {
        startingAccount: 100,
        currentAccount: 100,
        bet: 0,
        win: 0,
        currency: "coins",
    }






constructor() { }

    public updateWallet(): slotsAccount {

        return this.slotsAccount
    }

    private spinReels(context) {
        if (context === 'start') {
            this.reels.forEach((element, index) => {
                let positions: number[] = this.setPositions();
                // console.log(positions);

                let reel = document.getElementById('reel-cont-' + (index + 1));
                let reelNr = index;
                let allSlots = reel.getElementsByTagName('img');
                positions.forEach((element, index) => {
                    allSlots[index].id = reelNr.toString() + index.toString();

                    allSlots[index].src = this.reels[reelNr][element].image;
                    allSlots[index].alt = this.reels[reelNr][element].name;
                    // reel.appendChild(slot);
                    this.reelChart[index][reelNr] = this.reels[reelNr][
                        element
                    ].value;
                });
            });
        } else if (context === 'inGame') {
            this.reels.forEach((element, index) => {
                if (this.holdedReels[index] !== true) {
                    let positions: number[] = this.setPositions();
                    // console.log(positions);
                    let reel = document.getElementById(
                        'reel-cont-' + (index + 1)
                    );
                    let reelNr = index;
                    let allSlots = reel.getElementsByTagName('img');

                    // reel.innerHTML = '';

                    setTimeout(() => {
                        positions.forEach((element, index) => {
                            allSlots[index].id =
                                reelNr.toString() + index.toString();

                            allSlots[index].src = this.reels[reelNr][
                                element
                            ].image;
                            allSlots[index].alt = this.reels[reelNr][
                                element
                            ].name;

                            this.reelChart[index][reelNr] = this.reels[reelNr][
                                element
                            ].value;
                        });
                    }, index * 400);
                }
            });
        }

        setTimeout(() => {
            this.checkForWin();
        }, 1250);
        // console.log(this.reelChart)
    }










}

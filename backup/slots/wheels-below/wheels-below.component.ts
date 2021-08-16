import { Component, OnInit, HostListener } from '@angular/core';
import { SlotsService } from 'src/app/services/slots.service';
import { slotsAccount } from '../models/slotsAccount';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-wheels-below',
    templateUrl: './wheels-below.component.html',
    styleUrls: ['./wheels-below.component.scss'],
})
export class WheelsBelowComponent implements OnInit {
    @HostListener('window:keyup', ['$event'])
    buttonEvent(event: KeyboardEvent) {
        this.pushButton(event.key);
    }

    @HostListener('window:resize', ['$event'])
    onresize(event) {
        console.log( event.target.innerWidth)
    event.target.innerWidth;
    }

    slotsAccount: slotsAccount;

    constructor(
        private slotService: SlotsService,
        private modalService: ModalService
        ) {}

    ngOnInit() {
        this.slotsAccount = this.slotService.updateWallet();
        this.slotService.setReels();
        this.slotService.spinReels();
        let machine = document.getElementById("lower-machine-container")
        let machineWidth = machine.offsetWidth;
        machine.style.height = (machineWidth /2) + "px"
    }

    public play() {

        if (this.slotsAccount.currentAccount > 0) {
            this.slotService.play();
        } else {
            this.modalService.createModal("Unfortunately, you are BROKE!");
        }
    }

    public gamble(choice) {
        this.slotService.gamble(choice);
    }

    public holdReel(reel) {
        this.slotsAccount = this.slotService.holdReel(reel);
    }

    public cancel() {
        this.slotService.cancel()
    }

    private pushButton(event) {
        switch (event) {
            case 't':
                this.slotService.gamble('tails');
                break;
            case 'h':
                this.slotService.gamble('heads');
                break;
            case 'z':
                this.slotService.holdReel(0);
                break;
            case 'x':
                this.slotService.holdReel(1);
                break;
            case 'c':
                this.slotService.holdReel(2);
                break;
            case 'Enter':
                this.slotService.play();
                break;
            default:
                break;
        }
    }
}

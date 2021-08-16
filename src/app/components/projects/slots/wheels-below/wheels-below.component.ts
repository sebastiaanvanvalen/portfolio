import { Component, OnInit, HostListener } from '@angular/core';
import { SlotsService } from 'src/app/services/slots.service';
import { slotsAccount } from '../models/slotsAccount';
import { ModalService } from 'src/app/services/modal.service';
import { image } from 'd3';

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
        // innerWidth of window
        this.setDimensions(event.target.innerWidth)
        // console.log(event.target.innerWidth)
    }

    ratio = 100;


    slotsAccount: slotsAccount;

    constructor(
        private slotService: SlotsService,
        private modalService: ModalService
        ) {}

    ngOnInit() {
        this.setDimensions();
        
        this.slotService.setReels();
        this.slotService.spinReels();
        this.slotsAccount = this.slotService.updateWallet();


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

    private setDimensions(widthInput = null) {
        let windowWidth;
        let widthPercentage
        if(widthInput === null) {
            windowWidth = document.getElementsByTagName("html")[0].offsetWidth
        } else {
            windowWidth = widthInput
        }

        if (windowWidth < 768) {
            widthPercentage = ((windowWidth / 768) * 100);
        } else {
            widthPercentage = 100;
        }
        let reel = document.getElementById("reel-1")
        let reel1Transform = window.getComputedStyle(reel).transform
        console.log(reel1Transform)

        let container = document.getElementById("lower-machine-container")
        container.style.transform = "scale(" + widthPercentage + "%)"

        let imageWidth = document.getElementById("0-0").offsetWidth
        this.slotService.setRatio(imageWidth)


        console.log("windowWidth: " + windowWidth)
        console.log("windowPercentage: " + widthPercentage)


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

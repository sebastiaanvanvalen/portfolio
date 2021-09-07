import { Component, OnInit, HostListener, Input } from '@angular/core';
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
        this.setDimensions(event.target.innerWidth, event.target.innerHeight)
    }

    modalObject = {
        slots: {
            title: "about this slots machine",
            body: "It was a personal wish to make a slots machine myself. I have always enjoyed the logic, systems and mystery surrounding gambling games. Building a slots machine was, therefore, a great pleasure to do. I tried to copy the system of the classis <span style='color: orange; font-size: bold;'>Random Runner</span> machine. Examined the reels and order of slots, the prizes and combinations.<br>I raised the chance of winning a bit by returning a bit more money than the original machine so the players will stick around 100 point for long..."
        },
        styling: {
            title: "styling and timing",
            body: "there are many timing issues while playing the game. Should you be able to, for example, fire the 'play' function during a win animation? Or when the point are added to you wallet? Can you press a HOLD button when (some) wheels are still spinning. Is this not causing weird pauzes in some situations? All these issues are taken into account to resemble the original <span style='color: orange; font-size: bold;'>Random Runner</span> machine as good as possible."
        },
        reels: {
            title: "rotating the reels",
            body: "Using chrome on an somewhat older phone as a way of evaluating this project I experimented with a few ways to rotate the reels. It turned out my browser had least problems with a long list of slots. When pressing 'PLAY' the slots start at translateY(0) and adds at least 2 reel lengts plus a random amount of slots. This was the way it worked best in my older browser.<br>In the future I'll have to dive deeper in finding ways of putting less pressure on the browser performance and creating an even better animation. But for now I am happy with the results."
        },
        rebuilding: {
            title: "rebuilding on revisiting",
            body: "It was somewhat a challange to make a function to recreate the exact situation on revisiting the page. (for example: should the machine play a win animation on revisiting the page when it allready played before before the user left the page.)<br>It turned out there were a lot of these key moments and situations that needed to be stored in <span style='color: rebeccapurple; font-size: bold;'>LocalStorage</span> to be able to recreate the situation fairly. I think I have got rid of all the bugs and dealt with all unforseen situations."
        },
        broke: {
            title: "Oh No!!!",
            body: "Unfortunately, you are BROKE! No shame no game. For you we will start the game again :)"
        }

    }

    ratio = 100;

    localStorage = window.localStorage;
    slotsAccount: slotsAccount;

    subscription: any;

    constructor(
        private slotService: SlotsService,
        private ModalService: ModalService,
        ) {}

    ngOnInit() {
        this.slotService.setReels();
        this.setDimensions();
        
        if(JSON.parse(localStorage.getItem("baxxieRandom")) === null) {
            this.slotsAccount = this.slotService.getSlotsAccount();
            localStorage.setItem('baxxieRandom', JSON.stringify(this.slotsAccount))
            this.slotService.spinReels();
            
        } else {
            this.slotsAccount = JSON.parse(localStorage.getItem("baxxieRandom"))
            this.slotService.rebuildMachine(this.slotsAccount)
            this.slotService.playRebuildMessage();
        }

        this.slotService.updateSlotsAccount.subscribe(slotsAccount => {
            this.slotsAccount = slotsAccount
            localStorage.setItem('baxxieRandom', JSON.stringify(this.slotsAccount))
        })
    }

    public showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal()
    }

    public updateSlotsAccount(event) {  
        console.log(event)
    }

    public play() {
        if (this.slotsAccount.currentAccount < 1) {
            this.showModal('broke')
            this.slotService.resetGame()
        } 

        this.slotService.play();

    }

    public gamble(choice) {
        this.slotService.gamble(choice);
    }

    public holdReel(reel) {
        this.slotService.holdReel(reel);
    }

    public cancel() {
        this.slotService.cancel()
    }

    private setDimensions(widthInput = null, heightInput = null) {
        let container = document.getElementById("lower-machine-container")
        let imageWidth = document.getElementById("0-1").offsetWidth
        let windowWidth, windowHeight, ratio;
        
        this.slotService.setRatio(imageWidth)

        if(widthInput === null) {
            windowWidth = window.innerWidth
            windowHeight = window.innerHeight
        } else {
            windowHeight = heightInput
            windowWidth = widthInput
        }

        if (windowWidth < 768 || windowHeight < 536) {
            if (windowHeight > (windowWidth / 2)) {
                ratio = (windowWidth / 768) * 100;
            } else {
                ratio = (windowHeight / 380) * 100
            }
            container.scrollIntoView();

        } else {
            ratio = 100;
        }

        container.style.transform = "scale(" + ratio + "%)"
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
    
    ngOnDestroy() {
        this.slotService.updateSlotsAccount.unsubscribe
    }
}

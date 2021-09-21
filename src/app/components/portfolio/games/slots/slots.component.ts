import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { slotsAccount } from './interfaces/slotsAccount';
import { ModalService } from 'src/app/services/modal.service';
import { SlotsMachine } from './classes/SlotsMachine';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  constructor(private TitleService: Title, private ModalService: ModalService, private SlotsMachine: SlotsMachine) {
    this.TitleService.setTitle('Slots Machine - baxxie.nl')
   }
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
           body: "It was somewhat a challenge to make a function to recreate the exact situation when revisiting the page. (for example: should the machine play a win animation when revisiting the page if it allready played before the user left the page.)<br>It turned out there were a lot of these key moments and situations that needed to be stored in <span style='color: rebeccapurple; font-size: bold;'>LocalStorage</span> to be able to recreate the situation fairly."
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


   ngOnInit() {
       this.SlotsMachine.setReels();
       this.setDimensions();
       
       if(JSON.parse(localStorage.getItem("baxxieRandom")) === null) {
           this.slotsAccount = this.SlotsMachine.getSlotsAccount();
           localStorage.setItem('baxxieRandom', JSON.stringify(this.slotsAccount))
           this.SlotsMachine.spinReels();
           
       } else {
           this.slotsAccount = JSON.parse(localStorage.getItem("baxxieRandom"))
           this.SlotsMachine.rebuildMachine(this.slotsAccount)
           this.SlotsMachine.playRebuildMessage();
       }

       this.SlotsMachine.updateSlotsAccount.subscribe(slotsAccount => {
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
           this.SlotsMachine.resetGame()
       } 

       this.SlotsMachine.play();

   }

   public gamble(choice) {
       this.SlotsMachine.gamble(choice);
   }

   public holdReel(reel) {
       this.SlotsMachine.holdReel(reel);
   }

   public cancel() {
       this.SlotsMachine.cancel()
   }

   private setDimensions(widthInput = null, heightInput = null) {
       let container = document.getElementById("lower-machine-container")
       let imageWidth = document.getElementById("0-1").offsetWidth
       let windowWidth, windowHeight, ratio;
       
       this.SlotsMachine.setRatio(imageWidth)

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
               this.SlotsMachine.gamble('tails');
               break;
           case 'h':
               this.SlotsMachine.gamble('heads');
               break;
           case 'z':
               this.SlotsMachine.holdReel(0);
               break;
           case 'x':
               this.SlotsMachine.holdReel(1);
               break;
           case 'c':
               this.SlotsMachine.holdReel(2);
               break;
           case 'Enter':
               this.SlotsMachine.play();
               break;
           default:
               break;
       }
   }
   
   ngOnDestroy() {
       this.SlotsMachine.updateSlotsAccount.unsubscribe
   }
}

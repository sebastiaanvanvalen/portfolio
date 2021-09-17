import { Component, OnInit, HostListener } from '@angular/core';
import { MemoryAccount } from './interfaces/memoryAccount';
import { MemoryThemes } from './interfaces/memoryTheme';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-memory',
    templateUrl: './memory.component.html',
    styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent implements OnInit {
    // here the mode of the screen is set (mobile/horizontal or large/vertical)
    viewMode;
    @HostListener('window:orientationchange', ['$event'])
    onOrientationChange(event) {
        console.log('orientationChanged');
        console.log(event);
    }

    @HostListener('click', ['$event.target.id'])
    onClickBtn(btn) {
        if (event.target['id'].startsWith('card-') && !event.target['id'].startsWith("card-holder")) {
            this.toggleCard(event);
        }
        if (event.target['id'].startsWith('theme')) {
            this.setTheme(event);
        }
        if (event.target['id'].startsWith('btn-primary')) {
            this.restartGame();
        }
    }

    modalObject = {
        landScape: {
            title: "About memory",
            body: "Game only works in landScape orientation."
        },

    }

    memoryAccount: MemoryAccount = {
        theme: '',
        points: 0,
        attempts: 0,
        numberOfCards: 16,
        primaryButtonFunction: 'restart',
        secondaryButtonFunction: 'info',
        openCardTime: 1000,
        toggledCards: 0,
        toggledValues: [],
        toggledIds: [],
    };

    themes = [{
        name: "theme1",
        cards: [
            {
                name: "2S",
                src: 'assets/memorythemes/theme2/2S.png'
            },
            {
                name: "4D",
                src: 'assets/memorythemes/theme2/4D.png'
            },
            {
                name: "5C",
                src: 'assets/memorythemes/theme2/5C.png'
            },
            {
                name: "7H",
                src: 'assets/memorythemes/theme2/7H.png'
            },
            {
                name: "8S",
                src: 'assets/memorythemes/theme2/8S.png'
            },
            {
                name: "10H",
                src: 'assets/memorythemes/theme2/10H.png'
            },
            {
                name: "JD",
                src: 'assets/memorythemes/theme2/JD.png'
            },
            {
                name: "KC",
                src: 'assets/memorythemes/theme2/KC.png'
            },
        ],
        cover: 'assets/memorythemes/theme2/AS.png'
    },
    {
        name: "theme2",
        cards: [
            {
                name: "alarm",
                src: 'assets/memorythemes/theme1/alarm.png'
            },
            {
                name: "binoculars",
                src: 'assets/memorythemes/theme1/binoculars.png'
            },
            {
                name: "edit",
                src: 'assets/memorythemes/theme1/edit.png'
            },
            {
                name: "flag",
                src: 'assets/memorythemes/theme1/flag.png'
            },
            {
                name: "gift",
                src: 'assets/memorythemes/theme1/gift.png'
            },
            {
                name: "hourglass",
                src: 'assets/memorythemes/theme1/hourglass.png'
            },
            {
                name: "musicplayer",
                src: 'assets/memorythemes/theme1/musicplayer.png'
            },
            {
                name: "umbrella",
                src: 'assets/memorythemes/theme1/umbrella.png'
            }, 
        ],
        cover: 'assets/memorythemes/theme1/briefcase.png'
    }];

    constructor(private TitleService: Title, private ModalService: ModalService) {
        this.TitleService.setTitle('Memory - baxxie.nl')
    }

    ngOnInit() {
        this.themes.forEach((element, index) => {
            let themeContainer = document.getElementById('all-themes');
            let image = document.createElement("img");

            image.classList.add("card");
            image.style.gridRow = "1/2";
            image.style.gridColumn = index + "/" + (index + 1);
            image.style.height = "100px";
            image.style.width = "70px";

            image.id = element['name'];
            image.src = element['cover'];

            themeContainer.appendChild(image);
        })
    }

    public showModal(type) {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body'])
        this.ModalService.createModal()
    }

    private setTheme(event) {

        let themeContainer = document.getElementById('select-theme-container');
        let gameContainer = document.getElementById('game-container');

        themeContainer.style.display = "none";
        gameContainer.style.display = "grid";
        gameContainer.style.display = "ms-grid";

        this.memoryAccount.theme = event.target.id;
        this.shuffleCards()
    }

    private shuffleCards() {
        let cards = [];
        let theme = this.themes.filter(obj => {
            if( obj.name === this.memoryAccount.theme) {
                return obj.cards
            }
        })

        cards = theme[0]['cards'].concat(theme[0]['cards'])

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        for (let pos = 1; pos <= this.memoryAccount.numberOfCards; pos++) {
            if(pos < 10) {
                let card = <HTMLImageElement>document.getElementById("back-0" + pos)

                card.src = cards[pos - 1]['src']
                card.alt = cards[pos - 1]['name']
                card.parentElement.classList.add(cards[pos - 1]['name'])
            } else {
                let card = <HTMLImageElement>document.getElementById("back-" + pos)
                
                card.src = cards[pos - 1]['src']
                card.alt = cards[pos - 1]['name']
                card.parentElement.classList.add(cards[pos - 1]['name'])
            }
        }
    }



    private toggleCard(event) {
        if (this.memoryAccount.toggledCards < 2) {
            let cardValue = event.target.nextSibling.alt;
            let cardId = event.target['id'];
            let card = document.getElementById(cardId);
            let back = document.getElementById('back-'.concat(cardId.substring(5, 7)));

            this.memoryAccount.attempts++;
            this.memoryAccount.toggledCards++;
            this.memoryAccount.toggledIds.push(cardId);
            this.memoryAccount.toggledValues.push(cardValue);

            card.classList.remove('open');
            card.classList.add('close');
            back.classList.remove('close');
            back.classList.add('open');

            if (this.memoryAccount.toggledCards === 2) {
                if (this.memoryAccount.toggledValues[0] === this.memoryAccount.toggledValues[1]) {
                    this.memoryAccount.points++;
                    setTimeout(() => {
                        this.memoryAccount.toggledIds.forEach((element, index) => {
                                let back = document.getElementById('back-'.concat(element.substring(5, 7)));

                                document.getElementById(element).classList.add('win');
                                back.classList.add('win');
                            }
                        );
                    }, this.memoryAccount.openCardTime);

                    setTimeout(() => {
                        this.memoryAccount.toggledIds.forEach((element, index) => {
                                let back = document.getElementById('back-'.concat(element.substring(5, 7)));

                                document.getElementById(element).style.display = 'none';
                                back.style.display = 'none';
                            }
                        );
                        this.memoryAccount.toggledCards = 0;
                        this.memoryAccount.toggledIds = [];
                        this.memoryAccount.toggledValues = [];
                    }, this.memoryAccount.openCardTime + 1000);

                    if (this.memoryAccount.points === 8) {
                        console.log('reset game');
                    }
                } else {
                    setTimeout(() => {
                        this.memoryAccount.toggledIds.forEach((element, index) => {
                                let card = document.getElementById(element);
                                let back = document.getElementById('back-'.concat(element.substring(5, 7)));

                                card.classList.remove('close');
                                card.classList.add('open');
                                back.classList.remove('open');
                                back.classList.add('close');
                            }
                        );
                    }, this.memoryAccount.openCardTime);

                    setTimeout(() => {
                        this.memoryAccount.toggledCards = 0;
                        this.memoryAccount.toggledIds = [];
                        this.memoryAccount.toggledValues = [];
                    }, this.memoryAccount.openCardTime + 500);
                }
            }
        } else {
            return;
        }
    }

    private restartGame() {
        let themeContainer = document.getElementById('select-theme-container');
        let gameContainer = document.getElementById('game-container');

        themeContainer.style.display = "flex";
        gameContainer.style.display = "none";
        this.memoryAccount = {
            theme: '',
            points: 0,
            attempts: 0,
            numberOfCards: 16,
            primaryButtonFunction: 'restart',
            secondaryButtonFunction: 'info',
            openCardTime: 1000,
            toggledCards: 0,
            toggledValues: [],
            toggledIds: [],
        };



        for (let pos = 1; pos <= this.memoryAccount.numberOfCards; pos++) {
            // let back = document.getElementById('back-';

            if(pos < 10) {
                let back = <HTMLImageElement>document.getElementById("back-0" + pos);
                let card = <HTMLImageElement>document.getElementById("card-0" + pos);

                card.className = "";
                card.classList.add("card")
                card.classList.add("open")
                card.style.display = "flex";
                
                back.src = "";
                back.alt = "";
                back.className = "";
                back.style.display = "flex";
                back.classList.add("card")
                back.classList.add("close")
                back.parentElement.className = "card-holder";

            } else {
                let back = <HTMLImageElement>document.getElementById("back-" + pos)
                let card = <HTMLImageElement>document.getElementById("card-" + pos);
                
                card.className = "";
                card.classList.add("card")
                card.classList.add("open")
                card.style.display = "flex";
                
                back.src = "";
                back.alt = "";
                back.className = "";
                back.style.display = "flex";
                back.classList.add("card")
                back.classList.add("close")
                back.parentElement.className = "card-holder";
            }
        }
    }
}

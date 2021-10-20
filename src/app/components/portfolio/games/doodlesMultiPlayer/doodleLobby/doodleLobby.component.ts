import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '@angular/platform-browser';
import { SocketService } from 'src/app/services/socket.service';
// import { SocketIoService } from 'src/app/services/socketio.service';
import { User } from '../interface/user';
import { ModalService } from 'src/app/services/modal.service';
import { ServerObject } from '../interface/serverObject';

@Component({
    selector: 'app-doodleLobby',
    templateUrl: './doodleLobby.component.html',
    styleUrls: ['./doodleLobby.component.scss'],
})
export class DoodleLobbyComponent implements OnInit {
    @HostListener('document:keypress', ['$event'])
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.createGame();
        }
    }
    user: User = {
        userName: '',
        userIndex: -1,
        userId: '',
        createdAt: '',
    };
    rooms;
    playerCount: number = 0;
    localStorage = window.localStorage;

    constructor(
        private ModalService: ModalService,
        private socketService: SocketService,
        private router: Router,
        private TitleService: Title
    ) {
        this.TitleService.setTitle('Lobby - baxxie.nl');
    }

    ngOnInit(): void {
        this.user.userId = uuidv4();
        this.socketService.connect();
        this.receiveSocketUpdates();
    }

    createGame() {
        this.user.createdAt = new Date().toString();
        this.localStorage.setItem('doodleUser', JSON.stringify(this.user));
        let updateObject = {
            sender: this.user,
            type: "enterRoom",
            game: {},
            updatedOn: new Date().toString(),
        };

        let payload = JSON.stringify(updateObject)

        this.socketService.sendMessage({
            action: 'joinGame',
            payload: payload,
        });
    }

    private receiveSocketUpdates() {

        this.socketService.receivePermission().subscribe((ServerObject:ServerObject) => {
            console.log(ServerObject)

                switch (ServerObject.message) {
                    case 'firstPlayer':
                        // create sessiontoken
                        this.router.navigate(['doodlesMultiPlayer']);
        
                        break;
                    case 'twoPlayers':
                        // create sessiontoken
                        this.router.navigate(['doodlesMultiPlayer']);
        
                        break;
                    case 'roomFull':
                        this.ModalService.setBody(
                            'To bad. the maximum amount of players is allready in the room. Please try again later'
                        );
                        this.ModalService.setTitle('Full House');
                        this.ModalService.createModal();
                        break;
                    default:
                        this.ModalService.setBody(
                            'something went wrong<br>please contact administrator via the contactform'
                        );
                        this.ModalService.setTitle('OH oh...');
                        this.ModalService.createModal();
                }
            }
    );


    }

    emptyGame() {
        this.socketService.emptyGame(this.user);
    }
}

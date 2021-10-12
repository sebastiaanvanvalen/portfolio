import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '@angular/platform-browser';
import { SocketIoService } from 'src/app/services/socketio.service';
import { User } from '../interface/user';
import { ModalService } from 'src/app/services/modal.service';


@Component({
    selector: 'app-doodleLobby',
    templateUrl: './doodleLobby.component.html',
    styleUrls: ['./doodleLobby.component.scss'],
})
export class DoodleLobbyComponent implements OnInit {
    @HostListener('document:keypress', ['$event'])
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.createGame();
        }
    }
    user:User = {
        userName: "",
        userIndex: null,
        userId: "",
        createdAt: ""
    }
    rooms;
    playerCount: number = 0;
    localStorage = window.localStorage;
    
    constructor(
        private ModalService: ModalService,
        private socketService: SocketIoService,
        private router: Router,
        private TitleService: Title,
    ) {
        this.TitleService.setTitle('Lobby - baxxie.nl');
    }

    ngOnInit(): void {
        // this.receiveRoomFull();
        this.user.userId = uuidv4();
    }

    createGame() {
        this.user.createdAt = new Date().toString();
        this.localStorage.setItem('doodleUser', JSON.stringify(this.user));
        this.receivePermissionToGame();
        this.socketService.connect(this.user);
    }

    receivePermissionToGame(){
        this.socketService
        .receivePermissionToGame()
        .subscribe((user:User) => {
            this.router.navigate(['doodlesMultiPlayer' ]);
        });
    }
    
    emptyGame(){
        this.socketService.emptyGame(this.user);
    }

    receiveNewGame() {
        this.socketService
        .receiveNewGame()
        .subscribe((message: string) => {
            console.log(message);
        });
    }

    // receiveRoomFull() {
    //     this.socketService
    //     .receiveStartGame()
    //     .subscribe((message: string) => {
    //         this.ModalService.setBody("the room is currently full");
    //         this.ModalService.setTitle("OOPS");
    //         this.ModalService.createModal();
    //     });
    // }

}

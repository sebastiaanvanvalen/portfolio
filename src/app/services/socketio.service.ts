import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketIoService {
    socket: Socket;

    constructor() {
        this.socket = io(environment.SOCKET_ENDPOINT);
    }

    // SENDING
    connect(user) {
        this.socket.emit('joinGame', user);
    }

    disconnect(user) {
        this.socket.emit('chickendOut', user);
    }

    startGame(gameId) {
        this.socket.emit('startGame', { gameId: gameId });
    }

    emptyGame(userName) {
        this.socket.emit("emptyGame", {userName: userName})
    }

    sendGameUpdate(updateObject) {
        this.socket.emit('gameUpdate', updateObject);
    }
    
    sendWinningMessage(messageBody) {
        this.socket.emit('winMessage', messageBody);
    }

    // RECEIVING
    receiveUpdate() {
        return new Observable((observer) => {
            this.socket.on('update', (updateObject) => {
                observer.next(updateObject);
            });
        });
    }
    receiveDisconnect() {
        return new Observable((observer) => {
            this.socket.on('chickendOut', (user) => {
                observer.next(user);
            });
        });
    }

    receiveWinningMessage() {
        return new Observable((observer) => {
            this.socket.on('winMessage', (winningMessage) => {
                observer.next(winningMessage);
            });
        });
    }

    receivePermissionToGame() {
        return new Observable((observer) => {
            this.socket.on('permission', (user) => {
                observer.next(user);
            });
        });
    }

    receiveJoinedPlayers() {
        return new Observable((observer) => {
            this.socket.on('joinedPlayer', (user) => {

                observer.next(user);
            });
        });
    }

    receiveStartGame() {
        return new Observable((observer) => {
            this.socket.on('startGame', (startObject) => {
                observer.next(startObject)
            });
        });
    }

    // receiveRoomFull() {
    //     return new Observable((observer) => {
    //         this.socket.on('roomFull', (message) => {
    //             observer.next(message);
    //         });
    //     });
    // }

    receiveNewGame() {
        return new Observable((observer) => {
            this.socket.on('newGame', (message) => {
                observer.next(message);
            });
        });
    }


}

import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { switchAll, catchError, tap } from 'rxjs/operators';
import { ServerObject } from '../components/portfolio/games/doodlesMultiPlayer/interface/serverObject';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    webSocket: WebSocketSubject<any> = webSocket({
        url:
            'wss://n2emykr2qc.execute-api.eu-central-1.amazonaws.com/production',
        openObserver: {
            next: () => console.log('WebSocket connection open'),
        },
        deserializer: (events) => {
            // if (events.data && events.data.activities) {
            //   console.log('your dad is here');
            // }
            return events
          }
    });

    // private socket$: WebSocketSubject<any>;
    private messagesSubject$ = new Subject();
    public messages$ = this.messagesSubject$.pipe(
        switchAll(),
        catchError((e) => {
            throw e;
        })
    );


    constructor() {}

    ngOnInit() {
        // this.socket$.asObservable().subscribe((res) => {
        //     console.log(res);
        // });
    }

    public connect(): void {
        if (!this.webSocket || this.webSocket.closed) {
            const messages = this.webSocket.pipe(
                tap({
                    error: (error) => console.log(error),
                }),
                catchError((_) => _)
            );
            this.messagesSubject$.next(messages);
        }

    }


    sendMessage(message) {
        this.webSocket.next(message)
    }

    disconnect(user) {
        this.webSocket.next({ action: 'disconnect', payload: user });
    }

    startGame(gameId) {
        this.webSocket.next({ action: 'startGame', payload: gameId });
    }

    emptyGame(userName) {
        this.webSocket.next({ action: 'emptyGame', payload: userName });
    }

    sendGameUpdate(updateObject) {
        this.webSocket.next({ action: 'gameUpdate', payload: updateObject });
    }

    sendWinningMessage(messageBody) {
        this.webSocket.next({ action: 'winMessage', payload: messageBody });
    }

    // RECEIVING
    receivePermission() {
        return new Observable(observer => {
            this.webSocket.asObservable().subscribe(resp => {
                if (resp.data !== ''){
                    let data = JSON.parse(resp.data)
                    if (data.responseDestination === "lobby") {
                        observer.next(data)
                    }
                }
            })
        })
    }

    receiveUpdate() {
        return new Observable(observer=> {
            this.webSocket.asObservable().subscribe(resp => {
                if (resp.data !== ''){
                    let data = JSON.parse(resp.data)
                    if (data.responseDestination === "game") {
                        observer.next(data)
                    }
                }
            })
        });
    }

    receiveDisconnection() {
        return new Observable(observer=> {
            this.webSocket.asObservable().subscribe(resp => {
                if (resp.data !== ''){
                    let data = JSON.parse(resp.data)
                    if (data.responseDestination === "game") {
                        observer.next(data)
                    }
                }
            })
        });
    }

}

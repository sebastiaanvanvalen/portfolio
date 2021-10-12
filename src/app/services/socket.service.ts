import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


    myWebSocket: WebSocketSubject<any> = webSocket('wss://n2emykr2qc.execute-api.eu-central-1.amazonaws.com/production');

    constructor() {}
  
    ngOnInit() {
        this.myWebSocket.asObservable().subscribe((res) => {
            console.log(res);
          });
    }
  
    send() {
        console.log("about to sendPublic")
      this.myWebSocket.next({ action: 'sendPublic' });
    }
}

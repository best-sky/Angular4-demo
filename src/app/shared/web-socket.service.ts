import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws:WebSocket;

  constructor() { }

  createObservableSocket(url:string,id:number):Observable<any>{
    this.ws = new WebSocket(url)
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId:id})
        // 关闭数据流
        return () => this.ws.close();
      }
    )
  }
  sendMessage(message:any) {
    this.ws.send(JSON.stringify(message))
  }
}

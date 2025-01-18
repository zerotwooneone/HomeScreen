import {Injectable, computed, signal} from '@angular/core';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {ScreenModule} from "./screen.module";
import { Subject, Observable, defer } from 'rxjs';

@Injectable({
  providedIn: ScreenModule
})
export class ScreenHubService {

  private readonly _connection: signalR.HubConnection;
  private _connected= signal(false);
  readonly connected = computed(()=>this._connected());
  private readonly messageSubject: Subject<string>=new Subject();
  readonly message$: Observable<string>= this.messageSubject;
  private readonly imageUpdateSubject: Subject<ImageUpdateRequest>=new Subject();
  readonly imageUpdate$: Observable<ImageUpdateRequest>= this.imageUpdateSubject;
  constructor() {
    const defaultBuilder = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withKeepAliveInterval(5000)
      .withUrl("/screenHub");
    const builder = defaultBuilder.withServerTimeout(30000);
    this._connection = builder.build();
    this._connection.onclose(error => {
      this._connected.set(false);
      console.warn(`hub connection closed.`, error);
    });
    this._connection.onreconnected(connectionId => {
      console.info('reconnected', connectionId);
      this._connected.set(true);
    });
  }

  async connect(): Promise<boolean> {
    if (this._connected()) {
      console.warn(`already connected`);
      return this._connected();
    }
    if (!this._connection) {
      return false;
    }
    try {
      await this._connection.start();
    } catch (exception) {
      console.error("error connecting", exception);
      return false;
    }

    try {
      this.registerHandlers();
    } catch (exception) {
      console.error("error registering handlers", exception);
    }
    this._connected.set(true);
    return this._connected();
  }

  private registerHandlers() {
    this._connection.on("SendMessage", (message: string) => {
      this.messageSubject.next(message);
    });
    this._connection.on("ImageUpdate", (message: ImageUpdateModel) => {
      if(!message?.dataUrl) return;
      this.imageUpdateSubject.next({dataUrl:message.dataUrl});
    });
  }
}

class ImageUpdateModel{
  dataUrl?:string;
}

export type ImageUpdateRequest ={
  dataUrl:string;
}

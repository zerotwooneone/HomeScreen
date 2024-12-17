import {Injectable} from '@angular/core';
import {HubConnectionBuilder} from '@microsoft/signalr';
import {ObservableProperty} from "../../extensions/ObservableProperty";
import {ScreenModule} from "./screen.module";

@Injectable({
  providedIn: ScreenModule
})
export class ScreenHubService {

  private readonly _connection: signalR.HubConnection;
  private connected: ObservableProperty<boolean> = new ObservableProperty<boolean>(false);
  constructor() {
    const defaultBuilder = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withKeepAliveInterval(5000)
      .withUrl("/screenHub");
    const builder = defaultBuilder.withServerTimeout(30000);
    this._connection = builder.build();
    this._connection.onclose(error => {
      this.connected.Value = false;
      console.warn(`hub connection closed.`, error);
    });
    this._connection.onreconnected(connectionId => {
      console.info('reconnected', connectionId);
      this.connected.Value = true;
    });
  }

  async connect(): Promise<boolean> {
    if (this.connected.Value) {
      console.warn(`already connected`);
      return this.connected.Value;
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
    this.connected.Value = true;
    return this.connected.Value;
  }

  private registerHandlers() {
    this._connection.on("SendMessage", (message: object) => {
      console.warn('Received message', message);
    })
  }
}

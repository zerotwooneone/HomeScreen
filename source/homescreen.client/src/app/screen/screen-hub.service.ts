import { Injectable } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenHubService {

  constructor() { }

  async connect(): Promise<void> {
    const connection = new HubConnectionBuilder()
      .withUrl("/screenHub")
      .configureLogging(LogLevel.Information)
      .build();

    async function start() {
      try {
        await connection.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
      }
    }
    connection.onclose(async () => {
      console.warn('SignalR Disconnected. Waiting 1 second before retrying...');
      await of(1).pipe(delay(1000)).toPromise();
      console.log('Reconnecting...');
      await start();
    });

    // Start the connection.
    await start();
  }
}

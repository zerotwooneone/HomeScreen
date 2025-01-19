import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "../screen-hub.service";
import {Observable, filter, map, merge, shareReplay } from 'rxjs';

@Component({
  selector: 'zh-screen-home',
  templateUrl: './screen-home.component.html',
  styleUrl: './screen-home.component.scss'
})
export class ScreenHomeComponent implements OnInit {
  imageSource$: Observable<string>;
  constructor(private readonly _screenHub: ScreenHubService,) {
    this.imageSource$ = _screenHub.imageUpdate$.pipe(
      filter(imageUpdate => imageUpdate.type === 'imageSource'),
      map(imageUpdate => {
        return imageUpdate.source;
      }));
  }

  async ngOnInit() {
    await this._screenHub.connect();
    console.debug('screen hub connected');
  }
}

import { Component, OnInit } from '@angular/core';
import {ImageSourceRequest, ScreenHubService, SlideshowRequest} from "../screen-hub.service";
import {Observable, filter, map, merge, shareReplay } from 'rxjs';

@Component({
    selector: 'zh-screen-home',
    templateUrl: './screen-home.component.html',
    styleUrl: './screen-home.component.scss',
    standalone: false
})
export class ScreenHomeComponent implements OnInit {
  imageSource$: Observable<string>;
  constructor(private readonly _screenHub: ScreenHubService,) {
    this.imageSource$ = _screenHub.imageUpdate$.pipe(
      //filter(imageUpdate => imageUpdate.type === 'imageSource'),
      map(imageUpdate => {
        if(imageUpdate.type === 'imageSource') {
          return (imageUpdate as ImageSourceRequest).source;
        }else if(imageUpdate.type === 'slideshow') {
          return (imageUpdate as SlideshowRequest).urls[0];
        }
        console.debug("unknown image update", imageUpdate);
        return '';
      })
    );
  }

  async ngOnInit() {
    await this._screenHub.connect();
    console.debug('screen hub connected');
  }
}

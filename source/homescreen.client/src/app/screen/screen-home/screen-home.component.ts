import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ImageSourceRequest, ImageUpdateRequest, ScreenHubService, SlideshowRequest} from "../screen-hub.service";
import {map } from 'rxjs';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'zh-screen-home',
  templateUrl: './screen-home.component.html',
  styleUrl: './screen-home.component.scss',
  standalone: false
})
export class ScreenHomeComponent implements OnInit {
  images:Signal<string[]|undefined>;
  constructor(private readonly _screenHub: ScreenHubService,) {
    this.images = toSignal( _screenHub.imageUpdate$.pipe(
      map<ImageUpdateRequest, string[]>(imageUpdate => {
        if(imageUpdate.type === 'imageSource') {
          return [(imageUpdate as ImageSourceRequest).source];
        }else if(imageUpdate.type === 'slideshow') {
          return (imageUpdate as SlideshowRequest).urls;
        }
        console.debug("unknown image update", imageUpdate);
        return [''];
      })
    ));
  }

  async ngOnInit() {
    await this._screenHub.connect();
    console.debug('screen hub connected');
  }

  nextCarousel = signal<object | null>(null);
  previousCarousel = signal<object | null>(null);

  triggerNext() {
    this.nextCarousel.set({});
  }

  triggerPrevious() {
    this.previousCarousel.set({});
  }
}

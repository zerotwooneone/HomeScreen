import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "../screen-hub.service";
import {Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'zh-screen-home',
  templateUrl: './screen-home.component.html',
  styleUrl: './screen-home.component.scss'
})
export class ScreenHomeComponent implements OnInit {
  imageUrl$: Observable<string>;
  constructor(private readonly _screenHub: ScreenHubService,) {
    this.imageUrl$ = _screenHub.message$;
  }

  async ngOnInit() {
    await this._screenHub.connect();
  }
}

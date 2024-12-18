import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "../screen-hub.service";
import {Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'zh-screen-home',
  templateUrl: './screen-home.component.html',
  styleUrl: './screen-home.component.scss'
})
export class ScreenHomeComponent implements OnInit {
  readonly backgroundColor$: Observable<string>;
  private isRed =true;
  constructor(private readonly _screenHub: ScreenHubService,) {
    this.backgroundColor$ = this._screenHub.message$.pipe(
      map(()=> {
        this.isRed = !this.isRed;
        //console.log(`color ${this.isRed ? 'red': 'blue'}`)
        return this.isRed ? 'red': 'blue';
      }),
      shareReplay(1));
  }

  async ngOnInit() {
    await this._screenHub.connect();
  }
}

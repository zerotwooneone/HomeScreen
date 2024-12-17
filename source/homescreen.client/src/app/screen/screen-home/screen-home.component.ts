import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "../screen-hub.service";

@Component({
  selector: 'zh-screen-home',
  templateUrl: './screen-home.component.html',
  styleUrl: './screen-home.component.css'
})
export class ScreenHomeComponent implements OnInit {
  constructor(private readonly _screenHub: ScreenHubService,) {
  }

  async ngOnInit() {
    await this._screenHub.connect();
  }
}

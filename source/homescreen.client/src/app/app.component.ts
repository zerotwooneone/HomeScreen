import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "./screen/screen-hub.service";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient,
              private readonly _screenHub: ScreenHubService) {}

  async ngOnInit() {
    this.getForecasts();

    await this._screenHub.connect();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'homescreen.client';
}

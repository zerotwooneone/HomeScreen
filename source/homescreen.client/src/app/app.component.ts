import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ScreenHubService} from "./screen/screen-hub.service";
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

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
              private readonly activateRoute: ActivatedRoute,
              private readonly router: Router) {}

  async ngOnInit() {
    this.getForecasts();

    this.activateRoute.queryParamMap
      .pipe(filter(p => !!p.has('screen')))
      .subscribe(() => this.router.navigateByUrl('screen'));
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

  title = 'homescreen';
}

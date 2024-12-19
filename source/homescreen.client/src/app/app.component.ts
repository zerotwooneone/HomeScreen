import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly activateRoute: ActivatedRoute,
              private readonly router: Router) {}

  async ngOnInit() {
    this.activateRoute.queryParamMap
      .pipe(filter(p => !!p.has('screen')))
      .subscribe(() => this.router.navigateByUrl('screen'));
  }
}

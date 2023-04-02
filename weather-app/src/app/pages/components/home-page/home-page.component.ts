import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResult } from 'src/models/results.model';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  unit = 'F';
  loading = false;
  weatherInformations: IResult[] = []; /* new Array(9).fill({
    base: 'stations',
    clouds: { all: 77 },
    cod: '200',
    coord: { lon: 9.7043, lat: 4.0483 },
    dt: 1680471704,
    id: 2235748,
    main: {
      feels_like: 302.75,
      grnd_level: 1008,
      humidity: 85,
      pressure: 1010,
      sea_level: 1010,
      temp: 299.9,
      temp_max: 299.9,
      temp_min: 299.9,
    },
    name: 'Akwa',
    rain: { '1h': 0.16 },
    sys: {
      country: 'CM',
      sunrise: 1680412801,
      sunset: 1680456565,
      type: 1,
      id: 1,
    },
    timezone: 3600,
    visibility: 10000,
    weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '' }],
    wind: { speed: 1.52, deg: 182, gust: 3.08 },
  }); */
  constructor(private weatherApi: WeatherService, private router: Router) {}

  ngOnInit(): void {}

  search(query: string) {
    this.loading = true;
    this.weatherApi
      .getResults(query)
      .then((data: IResult[]) => {
        if (data) {
          this.weatherInformations = data;

          this.loading = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  changeUnit(event: Event) {
    var target = event.target as HTMLInputElement;
    if (target?.checked) {
      this.unit = target.value[0].toUpperCase();
      this.weatherInformations = this.weatherInformations.map((w) => {
        if (target.value == 'Celsius') {
          w.main.temp = +((w.main.temp - 32) * (5 / 9)).toFixed(2);
        } else {
          w.main.temp = +(w.main.temp * (9 / 5) + 32).toFixed(2);
        }

        return w;
      });
    }
  }
}

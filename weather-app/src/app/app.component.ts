import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IResult } from 'src/models/results.model';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;
  weatherInformations: IResult[] = [];

  constructor(private weatherApi: WeatherService) {}

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
}

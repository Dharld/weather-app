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
  loading = false;
  weatherInformations: IResult[] = [];

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

  openDetailPage(wInf: IResult) {
    this.router.navigate(['informations', wInf.id]);
  }
}

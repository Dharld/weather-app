import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap } from 'rxjs';
import { IResult } from 'src/models/results.model';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  loading = false;
  currentInf!: IResult;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherApi: WeatherService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const { id } = params;
      this.loading = true;
      this.weatherApi
        .getWInf(id)
        .then((res) => {
          console.log(res);
          this.currentInf = res;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    });
  }
}

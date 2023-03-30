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
  constructor() {}
}

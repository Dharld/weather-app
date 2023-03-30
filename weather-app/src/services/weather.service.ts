import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, tap, from, lastValueFrom } from 'rxjs';
import { ICoords } from 'src/models/coords.model';
import { IResult } from 'src/models/results.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('API_URL') private apiUrl: string,
    @Inject('API_GEO_KEY') private apiGeoKey: string,
    @Inject('API_GEO_URL') private apiGeoUrl: string,
    private _http: HttpClient
  ) {}

  getCoordinates(query: string) {
    const httpParams: HttpParams = new HttpParams()
      .append('access_key', this.apiGeoKey)
      .append('query', query)
      .append('output', 'json')
      .append('limit', 10);

    const options = { params: httpParams };

    const array$ = this._http
      .get<{ data: Array<{ coords: any }> }>(
        this.apiGeoUrl + '/forward',
        options
      )
      .pipe(map((res) => res.data));

    return lastValueFrom(array$);
  }

  async getResults(query: string) {
    let results: any = [];

    const promiseArray = await this.getCoordinates(query)
      .then((coords) => {
        results = coords?.map((coord: any) => {
          return {
            lat: coord.latitude,
            lon: coord.longitude,
          };
        });
        return results;
      })
      .then((coordinates: ICoords[]) =>
        coordinates.map((coord) => {
          const apiCall$ = this._http.get<IResult>(
            this.apiUrl +
              `/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${this.apiKey}`
          );
          return lastValueFrom(apiCall$);
        })
      )
      .catch((err) => {
        throw err;
      });
    return Promise.all(promiseArray);
  }

  async getWInf(id: string) {
    return lastValueFrom(
      this._http.get<IResult>(
        this.apiUrl + `/weather?id=${id}&appid=${this.apiKey}`
      )
    );
  }
}

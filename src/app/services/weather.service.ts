import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators"
import { environment } from "src/environments/environment";
import { Weather } from "../models/weather.model";
import { UrlConstants } from "../utils/constants/url-constants";

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  private API_URL = environment.mogesUrl + UrlConstants.API_SUFFIX;
  private API_WEATHER_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_UTIL + UrlConstants.ENDPOINT_WEATHER;

  private static buildWeatherFromResponse(response: any): Weather {
    return {
      clouds: response.nubes,
      description: response.descripcion,
      humidity: response.humedad,
      icon: response.icono,
      temperature: response.temperatura,
      wind: response.viento,
    };
  }

  public getWeather(): Observable<Weather> {
    const data = this.http.get(`${this.API_WEATHER_ENDPOINT}?city=Cartagena`, this.httpOptions);
    return data.pipe(map((response: any) => {
      return WeatherService.buildWeatherFromResponse(response);
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el tiempo', err);
      throw err;
    }));
  }

}
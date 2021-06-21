import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators"
import { environment } from "../../../../src/environments/environment";
import { Weather } from "../../models/weather.model";
import { UrlConstants } from "../../utils/constants/url-constants";
import { AuthService } from "./auth.service";

@Injectable()
export class WeatherService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_WEATHER_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_UTIL + UrlConstants.ENDPOINT_WEATHER;
  private token;

  constructor(
    private http: HttpClient,
    private authService:AuthService  
  ) {
    
   }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };


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

  public getWeather(token):Observable<Weather> {
    const weather = this.http.get(`${this.API_WEATHER_ENDPOINT}?city=Cartagena`, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      })
    });
    return weather.pipe(map((response:any) => {
      return WeatherService.buildWeatherFromResponse(response);
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el tiempo', err);
        throw err;
    }));         
  }

}
import { catchError, map } from 'rxjs/operators';
import { DayOff } from 'src/app/models/day-off.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_CATEGORIES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_CALENDARS;
  
  constructor(
    private http:HttpClient
  ) { }

  public getCalendars():Observable<DayOff[]> {
    const categories = this.http.get(this.API_CATEGORIES_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': localStorage.getItem('lang')
      }),
    });
    return categories.pipe(map((response:DayOff[]) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo los días inhábiles', err);
        throw err;
    }));
  }
}

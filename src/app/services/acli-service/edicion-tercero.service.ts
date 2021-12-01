import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TerceroFullDates } from 'src/app/models/tercero-full-dates.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EdicionTerceroService {
    private ENDPOINT_POST_SEND_DATES_THIRD = environment.atencion_cliente_url;

    constructor(
        private http: HttpClient
      ) { }

      public postDatesThird(datesForm): Observable<TerceroFullDates> {
        const loggedUser = this.http.post<any>(this.ENDPOINT_POST_SEND_DATES_THIRD ,datesForm);
        return loggedUser.pipe(map((response: TerceroFullDates) => {
          return response;
        })).pipe(catchError((err: Error) => {
          throw err;
        }));
      }
}
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Procediment } from 'src/app/models/procediment.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_PROCEDURES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_PROCEDURES;
  lang = this.translate.getDefaultLang();

  constructor(
    private http:HttpClient,
    private translate: TranslateService
  ) { }

  public getProcedimentById(id:string) : Observable<Procediment> {
    const procedure = this.http.get(`${this.API_PROCEDURES_ENDPOINT}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': this.lang
      }),
    });
    return procedure.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el procedimiento', err);
        throw err;
    }));   
  }

}

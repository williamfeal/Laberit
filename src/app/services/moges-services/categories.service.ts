import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Procedure } from 'src/app/models/procedure.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';
import { LanguagesService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_CATEGORIES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_CATEGORIES_BY_STATE;
  private API_PROCEDURES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_PROCEDURES;
  
  private lang;
  
  constructor(
    private http:HttpClient,
    private languageService:LanguagesService,
    private translate: TranslateService
  ) { 
  }

  public getAllCategories(lang):Observable<Category[]> {
    const categories = this.http.get(this.API_CATEGORIES_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': lang
      }),
    });
    return categories.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo las categorías', err);
        throw err;
    }));   
  }

  public getCategoryProcedures(id:string, lang): Observable<Procedure[]> {
    const procedures = this.http.get(`${this.API_PROCEDURES_ENDPOINT}?idCategory=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': lang
      }),
    });
    return procedures.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo los procedimientos', err);
        throw err;
    }));   
  }
}

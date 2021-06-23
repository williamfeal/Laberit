import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_CATEGORIES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_CATEGORIES;
  private API_PROCEDURES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_PROCEDURES;

  constructor(
    private http:HttpClient
  ) { }

  public getAllCategories(token):Observable<Category[]> {
    const categories = this.http.get(this.API_CATEGORIES_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Language':'es'
      }),
    });
    return categories.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo las categorías', err);
        throw err;
    }));   
  }

  public getCategoryProcediments(id:string, token) {
    const procedures = this.http.get(`${this.API_PROCEDURES_ENDPOINT}/?idCategory=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Language':'es'
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

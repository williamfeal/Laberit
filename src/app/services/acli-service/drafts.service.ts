import { catchError, map } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class DraftsService {

  private URL_DRAFT = environment.atencion_cliente_url+ UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_DRAFT;
  private URL_GET_DRAFTS = environment.atencion_cliente_url+ UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_DRAFT +  UrlConstants.ENDPOINT_DRAFTS;
  private URL_GET_DRAFT_BY_ID = environment.atencion_cliente_url+ UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_DRAFT + UrlConstants.ENDPOINT_GET_DRAFT_BY_ID;

  private headerInterceptor =  {headers: {useInterceptor:"true"} };

  constructor(
    private http: HttpClient
  ) { }

  public saveDraft(draft:Draft) {
    const saveDraft = this.http.post<any>(this.URL_DRAFT, draft, this.headerInterceptor);
    return saveDraft.pipe(map((response: Draft) => {
      return response;
    })).pipe(catchError((err: Error) => {
      throw err;
    }));
  }
  
  public getDrafts() {
    const draft = this.http.get<Draft[]>(`${this.URL_DRAFT}/${sessionStorage.getItem('nifTitular')}`, this.headerInterceptor);
    return draft.pipe(
      map((response: Draft[]) => {
      return response
    })).pipe(
      catchError((err: Error) => {
      throw err;
    }));
  } 
  
 /* Get draft children of draft */
  public getDraftChildren(id:string) {
    const draft = this.http.get<Draft[]>(`${this.URL_GET_DRAFTS}/${id}`, this.headerInterceptor);
    return draft.pipe(
      map((response: Draft[]) => {
      return response
    })).pipe(
      catchError((err: Error) => {
      throw err;
    }));
  }

  public getDraftById(draftId:string) {
    const draft = this.http.get<any>(`${this.URL_GET_DRAFT_BY_ID}/${draftId}`, this.headerInterceptor);
    return draft.pipe(map((response: Draft) => {
      return response;
    })).pipe(catchError((err: Error) => {
      throw err;
    }));
  } 
}

import { BusinessRule } from './../../models/business-rules.model';
import { catchError, map } from 'rxjs/operators';
import { Decision } from './../../models/decision.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class BusinessRulesService {

  private URL_BUSINESS_RULES = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_BUSINESS_RULES;
  private headerInterceptor =  {headers: {useInterceptor:"true"} };

  constructor(
    private http:HttpClient
  ) { }

  public businessRuleDecision(rule:BusinessRule) {
    const loggedUser = this.http.post<Decision>(this.URL_BUSINESS_RULES, rule, this.headerInterceptor);
    return loggedUser.pipe(map((response) => {
      return response;
    })).pipe(catchError((err: Error) => {
      throw err;
    }));
    
  }
}

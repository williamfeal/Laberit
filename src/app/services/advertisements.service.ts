import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { UrlConstants } from "../utils/constants/url-constants";

@Injectable()
export class AdvertisementsService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: {}
    };

    private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
    private API_ADVERTISEMENTS = this.API_URL + UrlConstants.ENDPOINT_ADVERTISEMENTS;

    constructor(private http: HttpClient) { }
    
    public getAllAdvertisement(): Observable<any[]> {

        const data = this.http.get(this.API_ADVERTISEMENTS, this.httpOptions);

        return data.pipe(map((response: any) => {
            return response;
        })).pipe(catchError((err: Error) => {
            console.error('Error obteniendo los roles', err);
            throw err;
        }));
    }
}
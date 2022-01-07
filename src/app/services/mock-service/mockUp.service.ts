import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MockUpService {

    private API_GRAPH: string;

    constructor(private http: HttpClient) {
        this.API_GRAPH = environment.mock_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_USER_LOGIN;
    }

    //cambiar llamada
    public sendFirma(firma): Observable<any> {
        const obs = this.http.post<any>(this.API_GRAPH, firma);
        return obs.pipe(map((resp: any) => {
            return resp;
        })).pipe(catchError((err: Error) => {
            throw err;
        }));
    }
}
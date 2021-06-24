import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class CsvService {

    private API_GRAPH: string;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/graphql', 'Authorization': `Bearer${sessionStorage.token}}`, })
    };

    constructor(private http: HttpClient) {
        this.API_GRAPH = environment.trex_url + '/api/v1';
     }


    public checkCSVDocument(csv): Observable<any> {
        const checkCSVDocument = `{
            checkCSVDocument(CSV:"`+ csv + `")
        }`;
        console.log('checkCSVDocument :>> ', checkCSVDocument);
        console.log('this.httpOptions :>> ', this.httpOptions);
        const obs = this.http.post<any>(this.API_GRAPH, checkCSVDocument, this.httpOptions);
        return obs.pipe(map((resp: any) => {
            return resp.data['checkCSVDocument'];
        })).pipe(catchError((err: Error) => {
            console.error('No existe este CSV', err);
            throw err;
        }));
    }
}
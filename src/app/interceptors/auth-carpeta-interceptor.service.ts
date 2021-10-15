import { environment } from 'src/environments/environment';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
    } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpFilter implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.headers.get('useInterceptor') === 'true') {
            return next.handle(this.addAuthentication(request));
        } else { return next.handle(request )}
    }

    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

            const token =  sessionStorage.getItem('token_user');
            if (token) {
                request = request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            }
        
        return request;

    }

}
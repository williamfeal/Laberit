import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarpetaService } from '../services/trex-service/carpeta.service';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private carpetaService:CarpetaService
    ) {
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token_user = sessionStorage.getItem('token_user');
        if(req.headers.get('useInterceptor') === 'true') {
            if(token_user) {
                req = req.clone( {
                    setHeaders: {
                        'Authorization': `Bearer ${token_user}`
                    }
                });
            }
            return next.handle(req).pipe(
                catchError((err:HttpErrorResponse) => {
                    if(err.status === 403) {
                        this.carpetaService.refreshToken().subscribe(
                            new_token => {
                                sessionStorage.setItem('token_user', new_token.accessToken)
                                req = req.clone( {
                                    setHeaders: {
                                        'Authorization': `Bearer ${new_token.accessToken}`
                                    }
                                });
                            });
                        return next.handle(req);
                    } else {
                        return next.handle(req);
                    }
                })
            );
    } else {
        return next.handle(req);
    }
  }
}
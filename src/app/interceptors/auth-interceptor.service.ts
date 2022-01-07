import {
  BehaviorSubject,
  Observable,
  of,
  throwError
  } from 'rxjs';
import { CarpetaService } from '../services/acli-service/carpeta.service';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap
  } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private carpetaService: CarpetaService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.headers.get('useInterceptor') === 'true') {
            return next.handle(request).pipe(
                catchError((error: any) => {
                    if (error.status === 403) {
                        return this.handle403Error(request, next);
                    }
                    return throwError(error);
                })
        );
        } else { return next.handle(request )}
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {

    
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);
            return this.carpetaService.refreshToken().pipe(switchMap(token => {
                if (token) {
                    this.tokenSubject.next(token.accessToken);
                    sessionStorage.setItem("token_user", token.accessToken)
                    return next.handle(request);
                }
            }),
            catchError(err => {
                return throwError(err.error);
            }),
            finalize(() => {
                this.isRefreshingToken = false;
            }));
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject
                .pipe(filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(request);
                }));
        }
    }
}
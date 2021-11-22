import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/moges-services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(private spinnerService: SpinnerService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.count === 0) {
      this.spinnerService.setHttpProgressStatus(true);
    }
    ++this.count;
    return next.handle(request).pipe(
      finalize(() => {
        --this.count;
        if (this.count === 0) {
          this.spinnerService.setHttpProgressStatus(false);
        }
      }));
  }
}
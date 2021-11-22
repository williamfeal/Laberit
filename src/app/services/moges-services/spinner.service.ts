import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isHttpLoading = new ReplaySubject<boolean>(1);

  constructor() { }

  public httpProgress(): Observable<boolean> {
    return this.isHttpLoading.asObservable();
  }

  public setHttpProgressStatus(isLoading: boolean): void {
    this.isHttpLoading.next(isLoading);
  }

}

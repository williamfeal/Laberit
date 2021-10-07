import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-help-home',
  templateUrl: './help-home.component.html',
  styleUrls: ['./help-home.component.scss']
})
export class HelpHomeComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}

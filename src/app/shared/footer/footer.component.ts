import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StyleService } from 'src/app/services/moges-services/style.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public src_logo;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private styleService:StyleService
  ) { }

  ngOnInit(): void {
    this.styleService.getStyles().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        this.src_logo = data.logo2;
      }
    )
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

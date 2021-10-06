import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-popover',
  templateUrl: './contact-popover.component.html',
  styleUrls: ['./contact-popover.component.scss'],
  providers: [NgbPopoverConfig]
})
export class ContactPopoverComponent implements OnInit {

  @ViewChild('popover') popover:ElementRef;
  public body;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private translateService:TranslateService,
    private config: NgbPopoverConfig
  ) { }

  ngOnInit(): void {
    this.translateService.stream('footer.contact_popover').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      text => {
        this.body = text.body;
        this.config.placement = 'top';
      }
    )
 
  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}

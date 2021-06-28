import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-popover',
  templateUrl: './contact-popover.component.html',
  styleUrls: ['./contact-popover.component.scss'],
  providers: [NgbPopoverConfig]
})
export class ContactPopoverComponent implements OnInit {

  @ViewChild('popover') popover:ElementRef;
  public body;

  constructor(
    private translateService:TranslateService,
    private config: NgbPopoverConfig
  ) { }

  ngOnInit(): void {
    this.translateService.get('footer.contact_popover').subscribe(
      text => {
        this.body = text.body;
        this.config.placement = 'top';
      }
    )
 
  }

}

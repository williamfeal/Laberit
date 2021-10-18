import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public title;
  public contactUsText;
  
  private captcha;
  private errorCaptcha;

  public contactForm:FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private translateService:TranslateService
  ) {
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
      policy: new FormControl(''),
      recaptcha: new FormControl()
    });
    
   }

  ngOnInit(): void {
    this.loadTexts();
    this.translateService.onLangChange.subscribe(
      () => this.loadTexts()
    )
  }

  private loadTexts() {
    this.translateService.get('contact').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.title = texts.title;
      this.contactUsText = texts.contact_us;
    })
  }

  handleSuccess(captchaResponse: string): void {
    this.captcha = true;
    this.errorCaptcha = false;
  }

  public submitForm() {

  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}

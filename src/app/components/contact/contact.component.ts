import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public title;
  private captcha;
  private errorCaptcha;

  public contactForm:FormGroup;

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
    this.translateService.get('contact').subscribe((texts: any) => {
      this.title = texts.title;
    })
  }

  handleSuccess(captchaResponse: string): void {
    this.captcha = true;
    this.errorCaptcha = false;
  }

  public submitForm() {

  }

}

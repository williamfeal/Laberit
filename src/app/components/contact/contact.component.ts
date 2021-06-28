import { Component, OnInit } from '@angular/core';
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
  constructor(
    private translateService:TranslateService
  ) { }

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

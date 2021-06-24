import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CsvService } from 'src/app/services/trex-service/csv.service';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {

  title = '';
  text = '';
  button = '';
  link = 'https://face.gob.es/es';
  enviar = false;
  aFormGroup: FormGroup;
  captcha: boolean = false;
  errorCaptcha: boolean = false;
  errorCsv: boolean = false;
  csv: string = ''
  constructor(public translate: TranslateService, public csvService: CsvService, private formBuilder: FormBuilder) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.translate.get('electronic-services.document-verification').subscribe((texts: any) => {
      this.title = texts.title;
      let text = document.getElementById("text");
      let csv = document.getElementById("placeholder_csv");
      let button = document.getElementById("button");
      let where_text = document.getElementById("where_text");
      let where_title = document.getElementById("where_title");
      text.innerHTML = texts.text;
      button.innerHTML = texts.button;
      where_title.innerHTML = texts.where_title;
      where_text.innerHTML = texts.where_text;
      button.setAttribute("href", this.link);
      csv.setAttribute("placeholder", texts.placeholder_csv);
      this.enviar = true;
    })
  }

  handleSuccess(captchaResponse: string): void {
    this.captcha = true;
    this.errorCaptcha = false;
  }

  captruarCsv(value) {
    this.csv = value;
    this.errorCsv = false;

  }
  showCsv() {
    if (this.csv.trim() == '') {
      this.errorCsv = true;
    } else {
      this.errorCsv = false;
    }
    if (this.captcha) {
      this.csvService.checkCSVDocument(this.csv).subscribe((documento: any) => {
        console.log('documento :>> ', documento);
      });
    } else {
      this.errorCaptcha = true;
    }
  }

}

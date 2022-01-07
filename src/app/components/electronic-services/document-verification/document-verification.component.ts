import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  error_csv: string;
  errorCsv_mal: string;
  csv_mal;
  csv: string = ''

  private unsubscribe$ = new Subject<void>();

  constructor(public translate: TranslateService, public csvService: CsvService, private formBuilder: FormBuilder) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.translate.stream('electronic-services.document-verification').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.title = texts.title;
      let text = document.getElementById("text");
      let csv = document.getElementById("placeholder_csv");
      let button = document.getElementById("button");
      let where_text = document.getElementById("where_text");
      let where_title = document.getElementById("where_title");
      this.csv_mal = document.getElementById("errorCsv");
      text.innerHTML = texts.text;
      button.innerHTML = texts.button;
      where_title.innerHTML = texts.where_title;
      where_text.innerHTML = texts.where_text;
      button.setAttribute("href", this.link);
      csv.setAttribute("placeholder", texts.placeholder_csv);
      this.errorCsv_mal = texts.error_csv_mal;
      this.error_csv = texts.error_csv;
      this.enviar = true;
    })
  }

  handleSuccess(captchaResponse: string): void {
    this.captcha = true;
    this.errorCaptcha = false;
  }

  captruarCsv(value) {
    this.csv = value;
    this.csv_mal.innerHTML = '';
    this.errorCsv = false;
  }
  showCsv() {
    if (this.csv.trim() == '') {
      this.csv_mal.innerHTML = this.error_csv;
      this.errorCsv = true;
    } else {
      this.csv_mal.innerHTML = '';
      this.errorCsv = false;
    }
    if (this.captcha) {
      this.csvService.checkCSVDocument(this.csv).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((documento: any) => {

        if (documento == null) {
          this.csv_mal.innerHTML = this.errorCsv_mal;
          this.errorCsv = true;
        } else {
          const byteArray = new Uint8Array(atob(documento).split('').map(char => char.charCodeAt(0)));
          const byte = new Blob([byteArray], { type: 'application/pdf' });
          const urlPdf = URL.createObjectURL(byte);
          window.open(urlPdf);
        }
      });
    } else {
      this.errorCaptcha = true;
    }
  }

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

}

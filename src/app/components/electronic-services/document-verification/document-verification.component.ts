import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public translate: TranslateService) {
    
  }

  ngOnInit(): void {
    this.translate.get('electronic-services.document-verification').subscribe((texts: any) => {
      this.title = texts.title;
      let text = document.getElementById("text");
      let csv = document.getElementById("placeholder_csv");
      let img = document.getElementById("placeholder_img");
      let button = document.getElementById("button");
      let where_text = document.getElementById("where_text");
      let where_title = document.getElementById("where_title");
      text.innerHTML = texts.text;
      button.innerHTML = texts.button;
      where_title.innerHTML = texts.where_title;
      where_text.innerHTML = texts.where_text;
      button.setAttribute("href", this.link);
      csv.setAttribute("placeholder", texts.placeholder_csv)
      img.setAttribute("placeholder", texts.placeholder_img)
      this.enviar = true;
    })
  }

}

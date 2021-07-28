import { Component, NgZone, OnInit } from '@angular/core';

declare function getBase64Certificate();
declare function signDocumentByCertificate(document);

@Component({
  template: ''
})

export class AppUtils implements OnInit {

  public documentSigned = '';

  constructor(private ngZone: NgZone) {
  }

  public ngOnInit(): void {
  }

  public getSign(): Promise<string> {
    window['appUtilsReference'] = { component: this, zone: this.ngZone };
    getBase64Certificate();
    return new Promise((resolve, reject) => {
      const listener = setInterval(() => {
        if (sessionStorage.getItem("b64Certificate") != null) {
          clearInterval(listener);
          resolve(sessionStorage.getItem("b64Certificate"));
        }
      }, 500);
    });
  }

  /**
   * Calls autofirma with the document to sign B64 and
   * returns a promise depending when document is signed
   *
   * @param documentToSign: In base64
   * @return Promise when document is signed
   */
   public signDocument(documentToSign: string): Promise<string> {
    window['appUtilsReference'] = { component: this, zone: this.ngZone };
    signDocumentByCertificate(documentToSign);

    return new Promise((resolve, reject) => {
      const listener = setInterval(() => {
        if (this.documentSigned) {
          clearInterval(listener);
          resolve(this.documentSigned);
        }
      }, 500);
    });
  }
}

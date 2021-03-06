import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';

declare function checkNif(nif: string): number;
declare function getBase64Certificate();
declare function signDocumentByCertificate(document);

@Component({
  template: ''
})

export class AppUtils implements OnInit {

  public documentSigned = '';
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  
  constructor(private ngZone: NgZone,
    private router: Router,
    private location: Location) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;

      };
    });
  }

  public ngOnInit(): void {
  }

  public getSign(): Promise<string> {
    window['appUtilsReference'] = { component: this, zone: this.ngZone };
    getBase64Certificate();
    return new Promise((resolve, reject) => {
      const listener = setInterval(() => {
        if (sessionStorage.getItem("b64Certificate") != 'null') {
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
  public signDocument(documentToSignData: string): Promise<string> {
    let documentToSign;
    documentToSign = documentToSignData.split(',')[1];
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

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  public return() {
    this.previousUrl = this.getPreviousUrl();
    this.currentUrl = this.getCurrentUrl();
    if (this.previousUrl == this.currentUrl || this.previousUrl == '/') {
      this.router.navigate(['inicio']);
    } else {
      this.location.back();
    }
  }

  /**
   * The method calls Check Nif function which validates the input NIF
   *
   * @param nif to validate
   * @return validation code ( > 0 = Correct - < 0 = Incorrect)
   */
  public static callCheckNif(nif: string): number {
  return checkNif(nif);
  }

  public static sortConceptsAlphabetically(data:SelectFieldObject[]) {
    return data.sort(function(a, b){
      if(a.description < b.description) { return -1; }
      if(a.description > b.description) { return 1; }
      return 0;
    })
  }

  /**
   * This method replace all break line into text param with spaces
   * @param text text to replace break line with spaces
   * @returns text witout break line
   */
  public static removeBreakLine(text:string):string{
    return text.replace(/(\r\n|\n|\r)/gm, " ");
  }

}

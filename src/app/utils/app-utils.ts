import { Component, NgZone, OnInit } from '@angular/core';

declare function getBase64Certificate();

@Component({
  template: ''
})

export class AppUtils implements OnInit {

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
}

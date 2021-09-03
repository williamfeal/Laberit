import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/moges-services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'sede-angular';
  public token: boolean;
  
  public hiddenMenu:boolean;

  constructor(    
    private authService: AuthService,
    private router:Router,
    private translate:TranslateService
  ) {
    const selectedLang = localStorage.getItem('lang') ? localStorage.getItem('lang') :
            this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 'es';
        this.translate.use(selectedLang);
    this.loadToken();
    setInterval(() => { this.loadToken(); }, 300000);
  }

  ngOnInit():void {
    this.router.events.subscribe(
      data => {
        if(data instanceof RoutesRecognized) {
          this.hiddenMenu = data.state.root.firstChild.data.menu === false? true : false;
        }
      }
    )
  }

  private loadToken() {
    this.authService.getToken().subscribe(
      data => {
        sessionStorage.setItem('token', data);
        this.token = true;
      });
  }
}

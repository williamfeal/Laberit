import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
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
    private router:Router
  ) {
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

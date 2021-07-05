import { Component } from '@angular/core';
import { AuthService } from './services/moges-services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sede-angular';
  token: boolean;
  constructor(    private authService: AuthService    ) {
    this.loadToken();
    setInterval(this.loadToken, 300000);
  }

  private loadToken() {
    this.authService.getToken().subscribe(
      data => {
        sessionStorage.setItem('token', data);
        this.token = true;
      });
  }
}

import { Component } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';
import { AuthService } from 'src/app/services/moges-services/auth.service';
import { WeatherService } from 'src/app/services/moges-services/weather.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  public weatherData: any = {};

  constructor(
    private weatherService: WeatherService,
    private authService:AuthService
  ) {
    this.getWeatherData();
  }

  private getWeatherData(): void {
    this.authService.getToken().subscribe(
      data => {
        this.weatherService.getWeather(data).subscribe((weather: Weather) => {
          this.weatherData = weather;
        }, error => SwalUtils.showSimpleAlert(AppConstants.TITLE_ERROR, AppConstants.ERROR_LOAD_WEATHER, 'info'));
      })
  }
}

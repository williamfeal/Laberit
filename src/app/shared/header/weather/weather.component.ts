import { Component } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  public weatherData: any = {};

  constructor(private weatherService: WeatherService) {
    this.getWeatherData();
  }

  private getWeatherData(): void {
    this.weatherService.getWeather().subscribe((data: Weather) => {
      this.weatherData = data;
    }, error => SwalUtils.showSimpleAlert(AppConstants.TITLE_ERROR, AppConstants.ERROR_LOAD_WEATHER, 'info'));
  }
}

import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Weather } from 'src/app/models/weather.model';
import { AuthService } from 'src/app/services/moges-services/auth.service';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
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
  private unsubscribe$ = new Subject<void>();
  constructor(
    private weatherService: WeatherService,
    private authService:AuthService,
    private languageService:LanguagesService
  ) {
    this.languageService.lang.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(lang => {
      this.getWeatherData();
    })
    this.getWeatherData();
  }

  private getWeatherData(): void {
    this.authService.getToken().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        this.weatherService.getWeather(data).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((weather: Weather) => {
          this.weatherData = weather;
        }, error => SwalUtils.showSimpleAlert(AppConstants.TITLE_ERROR, AppConstants.ERROR_LOAD_WEATHER, 'info'));
      })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

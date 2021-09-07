import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const lang =
      this.translateService.currentLang === 'va' ? 'ca-ES' : this.translateService.currentLang;
    const datePipe: DatePipe = new DatePipe(lang);
    const firstLettter = datePipe.transform(value, pattern).substr(0,1).toUpperCase();
    return firstLettter + datePipe.transform(value, pattern).substr(1);
  }

}
import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent implements OnInit {

  public title = '';
  public text = '';
  public button = '';
  public link = 'https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=4m5FtivXttEQK2TEfXGy%2BA%3D%3D';
  public enviar = false;

private unsubscribe$ = new Subject<void>();

  constructor(
    public translate: TranslateService,
    private cdr:ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.translate.stream('contractor-profile').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
        });
  }

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

}

import { ActivatedRoute } from '@angular/router';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { Component, Input, OnInit } from '@angular/core';
import { InfoProcedure } from 'src/app/models/info-procedure.model';
import { Procedure } from 'src/app/models/procedure.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-carpeta-ciudadana',
  templateUrl: './header-carpeta-ciudadana.component.html',
  styleUrls: ['./header-carpeta-ciudadana.component.scss']
})
export class HeaderCarpetaCiudadanaComponent implements OnInit {

  public breadcrumbs: any[];
  public user;

  @Input() procedure!: Procedure;

  public infoProcedure: InfoProcedure;
  public draft;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private translateService: TranslateService,
    private carpetaUtils: CarpetaUtils,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.translateService.onLangChange.subscribe
      (
        () => this.loadData()
      )

  }

  loadData() {
    if (this.procedure) {
      this.infoProcedure = this.procedure.languages.find(
        language => language.codigo === localStorage.getItem('lang')
      )
    }
    this.user = this.carpetaUtils.getSession();
  }

  editThird(nif: string) {
    this.router.navigate(['/carpeta-del-ciudadano/edit-request/' + nif]);
  }

  exit() {
    localStorage.setItem("ReadOnly", "false");
    this.cleanStorage();
    this.router.navigateByUrl('/inicio');
  }

  cleanStorage() {
    let token = window.sessionStorage.getItem('token');
    window.sessionStorage.clear();
    window.sessionStorage.setItem('token', token);
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

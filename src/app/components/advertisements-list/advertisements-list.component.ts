import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AdvertisementsModel } from "src/app/models/advertisements.model";
import { AdvertisementsService } from "src/app/services/moges-services/advertisements.service";
import { LanguagesService } from "src/app/services/moges-services/language.service";

@Component({
  selector: 'app-advertisements-list',
  templateUrl: 'advertisements-list.component.html'
})

export class AdvertisementsListComponent implements OnInit {

  public title:string;
  public anunciosMoges:AdvertisementsModel[];
  public loading = true;
  private lang = this.translate.currentLang;
  private unsubscribe$ = new Subject<void>();


  constructor(
    private advertisementsService: AdvertisementsService, 
    public translate: TranslateService,
    public languageService:LanguagesService) {
   
  }

  ngOnInit() { 
    this.translate.stream("advertisements").pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.title = this.translate.instant('advertisements.title'); 
    });    
    this.languageService.lang.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      lang => {    
        this.loading = true;
        this.lang = lang;
        this.loadData();
      }
    )
    if(this.lang)
      this.loadData();
  }

  
  private loadData() {
    this.advertisementsService.getAllAdvertisement(sessionStorage.token, this.lang)
      .subscribe((advertisementslList: AdvertisementsModel[]) => {
        this.anunciosMoges = advertisementslList;
        this.loading = false;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
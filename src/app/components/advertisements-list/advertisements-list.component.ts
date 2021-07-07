import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
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

  constructor(
    private advertisementsService: AdvertisementsService, 
    public translate: TranslateService,
    public languageService:LanguagesService) {
    this.translate.get('advertisements').subscribe((texts: any) => {
      this.title = texts.title;
    });    
  }

  ngOnInit() { 
    this.languageService.lang.subscribe(
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
    this.advertisementsService.getAllAdvertisement(sessionStorage.token, this.lang).subscribe((advertisementslList: AdvertisementsModel[]) => {
      this.anunciosMoges = advertisementslList;
      this.loading = false;
    });
  }

}
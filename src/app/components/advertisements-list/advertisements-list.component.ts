import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AdvertisementsModel } from "src/app/models/advertisements.model";
import { AdvertisementsService } from "src/app/services/moges-services/advertisements.service";

@Component({
  selector: 'app-advertisements-list',
  templateUrl: 'advertisements-list.component.html'
})

export class AdvertisementsListComponent implements OnInit {

  title;

  anunciosMoges;
  constructor(private advertisementsService: AdvertisementsService, public translate: TranslateService) {
    this.translate.get('advertisements').subscribe((texts: any) => {
      this.title = texts.title;
    })
    this.advertisementsService.getAllAdvertisement(sessionStorage.token).subscribe((advertisementslList: AdvertisementsModel[]) => {
      this.anunciosMoges = advertisementslList;
    });
  }


  ngOnInit() { }

  verAnuncio() {

  }
}
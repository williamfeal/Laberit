import { Component, OnInit } from "@angular/core";
import { AdvertisementsModel } from "src/app/models/advertisements.model";
import { AdvertisementsService } from "src/app/services/advertisements.service";

@Component({
  selector: 'app-advertisements-list',
  templateUrl: 'advertisements-list.component.html'
})

export class AdvertisementsListComponent implements OnInit {

  title = 'TABLÓN DE ANUNCIOS'

  anunciosMoges;
  constructor(private advertisementsService: AdvertisementsService) {

    this.advertisementsService.getAllAdvertisement(sessionStorage.token).subscribe((advertisementslList: AdvertisementsModel[]) => {
      this.anunciosMoges = advertisementslList;
    });
  }


  ngOnInit() { }

  verAnuncio() {

  }
}
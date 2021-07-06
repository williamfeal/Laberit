import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdvertisementsModel } from 'src/app/models/advertisements.model';
import { AdvertisementsService } from 'src/app/services/moges-services/advertisements.service';

@Component({
  selector: 'app-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrls: ['./advertisement-detail.component.scss']
})
export class AdvertisementDetailComponent implements OnInit {

  public idAnuncio;
  public anuncio: AdvertisementsModel;
  public documento = false;
  public datosAnuncio;
  public title;
  
  constructor(private advertisementsService: AdvertisementsService,
    private route: ActivatedRoute,
    public translate: TranslateService) {
    this.idAnuncio = this.route.snapshot.paramMap.get('idAnuncio');
    this.translate.get('advertisements_detail').subscribe((texts: any) => {
      this.title = texts.title;
    });
    this.advertisementsService.getAdvertisementById(sessionStorage.token, this.idAnuncio).subscribe((advertisement: AdvertisementsModel) => {
      this.anuncio = advertisement;
      this.anuncio.languages.forEach(element => {
        if (element.codigo == this.translate.getDefaultLang()) {
          this.datosAnuncio = element;
        }
      });
      if (this.anuncio.attachedDocument != '' && this.anuncio.attachedDocument != null) {
        this.documento = true;
      }
    });
  }
  ngOnInit(): void {
  }

  verDocumentacion(document) {
    const byteArray = new Uint8Array(atob(document).split('').map(char => char.charCodeAt(0)));
    const byte = new Blob([byteArray], { type: 'application/pdf' });
    const urlPdf = URL.createObjectURL(byte);
    window.open(urlPdf, '_blank');
  }

}

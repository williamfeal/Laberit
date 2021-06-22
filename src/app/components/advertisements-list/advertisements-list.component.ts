import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-advertisements-list',
    templateUrl: 'advertisements-list.component.html'
})

export class AdvertisementsListComponent implements OnInit {

  title = 'TABLÓN DE ANUNCIOS'
    
    anunciosMoges;
    constructor() { }

    ngOnInit() { }

    verAnuncio() {

    }
}
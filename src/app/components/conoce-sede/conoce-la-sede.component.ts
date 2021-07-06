import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-conoce-la-sede',
    templateUrl: './conoce-la-sede.component.html',
    styleUrls: ['./conoce-la-sede.component.scss']
})
export class ConoceLaSedeComponent {

    title: string;
    components;
    title2: string;
    texto: string;
    categoria;
    lista = ['know_sede', 'normative', 'contents', 'services', 'electronic_record', 'signature_certificates', 'document_veriication', 'date', 'calendars', 'records_offices', 'programs_stops'];
    menuList = [];
    constructor(
        public translate: TranslateService
        ) {

        this.translate.get('know_sede').subscribe((texts: any) => {
            this.title = texts.title;
            this.components = texts.components;
            for (let element of this.lista) {
                this.menuList.push(this.components[element]);
            }
            this.categoria = this.menuList[0];
        });
    }   
    

    public changeKnow(categoria) {
        this.categoria = categoria;
    }

}

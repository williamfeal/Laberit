import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-conoce-la-sede',
    templateUrl: './conoce-la-sede.component.html',
    styleUrls: ['./conoce-la-sede.component.scss']
})
export class ConoceLaSedeComponent implements OnInit {

    title: string;
    components;
    title2: string;
    texto: string;
    categoria;
    lista = ['know_sede', 'normative', 'contents', 'services', 'electronic_record', 'signature_certificates', 'document_veriication', 'date', 'calendars', 'records_offices', 'programs_stops'];
    menuList = [];
    constructor(public translate: TranslateService) {

        this.translate.get('know_sede').subscribe((texts: any) => {
            let em = 'this';
            this.title = texts.title;
            this.components = texts.components;
            for (let index = 0; index < this.lista.length; index++) {
                let holi = this.lista[index];
                const element = this.components[holi];
                this.menuList.push(element);
            }
            this.categoria = this.menuList[0]
        })
    }

    ngOnInit(): void {
    }

    changeKnow(categoria) {
        this.categoria = categoria;
    }

}

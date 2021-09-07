import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-conoce-la-sede',
    templateUrl: './conoce-la-sede.component.html',
    styleUrls: ['./conoce-la-sede.component.scss']
})
export class ConoceLaSedeComponent implements OnInit {

    public title: string;
    public components;
    public title2: string;
    public texto: string;
    public categoria;
    public lista = ['know_sede', 'normative', 'contents', 'services', 'electronic_record', 'signature_certificates', 'document_veriication', 'date', 'calendars', 'records_offices', 'programs_stops'];
    public menuList = [];

    public fragment:string;
    constructor(
        public translate: TranslateService,
        private activatedRoute:ActivatedRoute,
        ) {
             this.activatedRoute.fragment.subscribe(
                fragment => this.fragment = fragment
            )
        
    }   
    
    ngOnInit() {
        this.translate.stream('know_sede.components.' + this.fragment).subscribe((texts: any) => {
            this.categoria = texts
        });
        this.translate.stream('know_sede').subscribe((texts: any) => {
            this.menuList = [];
            this.title = texts.title;
            this.components = texts.components;
            for (let element of this.lista) {
                this.menuList.push(this.components[element]);
            }
        });
    }
}

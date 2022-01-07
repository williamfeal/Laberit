import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-generic-static-help',
    templateUrl: 'generic-static-help.component.html'
})

export class GenericStaticHelpComponent implements OnInit {

    @Input() public title: string;
    @Input() public texts;
    enviar: boolean;
    constructor() { }

    ngOnInit() {
        this.enviar = true;
    }
}
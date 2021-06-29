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
        let text = document.getElementById("text_card");
        let header_card = document.getElementById("header_card");
        text.innerHTML = this.texts.text;
        header_card.innerHTML = this.texts.header_card;
        this.enviar = true;
    }
}
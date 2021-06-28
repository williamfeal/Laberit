import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-header-know-sede',
    templateUrl: 'header-know-sede.component.html'
})

export class HeaderKnowSedeComponent implements OnInit, OnChanges {

    @Input() public categoria;
    constructor() {

    }

    ngOnInit() {
    }
    public ngOnChanges(changes: SimpleChanges): void {
        let idHeaderCategory = document.getElementById("id-header-category");
        let texto = document.getElementById("text-category");
        
        idHeaderCategory.innerHTML = this.categoria.name;
        texto.innerHTML = this.categoria.texto;
    }
}
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-header-know-sede',
    templateUrl: 'header-know-sede.component.html'
})

export class HeaderKnowSedeComponent implements OnInit {

    @Input() public categoria;
    constructor() {

    }

    ngOnInit() {
    }
    
}
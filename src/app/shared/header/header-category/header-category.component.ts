import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-category',
    templateUrl: 'header-category.component.html',
    styleUrls: ['./header-category.component.scss']

})

export class HeaderCategoryComponent implements OnInit {

    @Input() public title: string;

    constructor() { }

    ngOnInit() { 
        let header = document.getElementById("header-title");
        header.innerHTML = this.title;
    }
}
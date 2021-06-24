import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public token;

    constructor() { }

    ngOnInit() { 
        this.token = sessionStorage.token;
    }
}
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public token;
    interval;
    constructor() { }

    ngOnInit() {
        this.interval = setInterval(() => {
            if(sessionStorage.token != ''  )
            this.token = sessionStorage.token, 1000;
            clearInterval(this.interval);
        }, 1000);
    }

}
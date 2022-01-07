import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app-utils';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-button-back',
    templateUrl: 'button-back.component.html',
    styleUrls: ['./button-back.component.scss']
})

export class ButtonBackComponent implements OnInit {

    faChevronLeft = faChevronLeft;
    constructor(public appUtils: AppUtils) { }

    ngOnInit() { }

    return() {
        this.appUtils.return();
    }
}
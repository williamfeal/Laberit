import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-generic-static-view',
    templateUrl: 'generic-static-view.component.html',
    styleUrls: ['./generic-static-view.component.scss']

})

export class GenericStaticViewComponent implements OnInit {

    @Input() public title: string;
    @Input() public text: string;
    @Input() public button: string;
    @Input() public link: string;

    constructor( ) { }

    ngOnInit() {
    }

}
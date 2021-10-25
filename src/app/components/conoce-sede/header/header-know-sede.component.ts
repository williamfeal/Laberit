import { CalendarService } from './../../../services/moges-services/calendar.service';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { DayOff } from 'src/app/models/day-off.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header-know-sede',
    templateUrl: 'header-know-sede.component.html'
})

export class HeaderKnowSedeComponent implements OnInit {

    @Input() public categoria;
    @Input() public fragment:string;
    

    public daysOff:DayOff[];
    public lang:string;
    public monthNames = {
        ca: [ 'gener', 'febrer', 'març', 'arbil', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'],
        es : [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    }
    
    constructor(
        private calendarService:CalendarService,
        public translateService:TranslateService
    ) { }

    ngOnInit() {
        this.lang = localStorage.getItem('lang')
        this.translateService.onLangChange.subscribe(
            () => {
                this.lang = this.translateService.currentLang
                this.loadData();
            }
        )
        this.loadData();
    }

    private loadData() {
        this.calendarService.getCalendars().subscribe(
            (data:DayOff[]) => {
                this.daysOff = data.sort((a,b) => {return a.month - b.month})
            });
    }
    
}
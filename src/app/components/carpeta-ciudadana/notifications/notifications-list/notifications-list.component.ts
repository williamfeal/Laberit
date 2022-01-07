import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from './../../../../services/acli-service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  public dataSource:Notification[];
  public dataSave:Notification[];

  public displayedColumns = [ 'state', 'concept', 'notification-date',  'actions'];

  public showSpinner:boolean = false;
  public seeOnlyNotRead:boolean = false;
  public searchInput:string;

  constructor(
    private router:Router,
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.notificationService.getEnvios2().subscribe(
      (data:Notification[]) => {
        this.dataSave = data;
        this.dataSource = data;
        this.showSpinner = false;
      })
  }

  public navToNotificationView(notification:Notification) {
    this.router.navigate(['/carpeta-del-ciudadano/notification-view/' + notification.envioDestinatario])
  }

  public filter(event) {
    if(event === true) {
      this.dataSource = this.dataSave.filter(data => { if(data.estado === 'Pendiente') return data })
    } else {
      this.dataSource = this.dataSave
    }
  }

  public search() {
    this.dataSource = this.dataSave.filter(data => { 
      if(data.concepto.includes(this.searchInput) || data.estado.includes(this.searchInput)) return data })

  }
}

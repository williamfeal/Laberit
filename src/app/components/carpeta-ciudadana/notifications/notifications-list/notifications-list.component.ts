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
  public displayedColumns = [ 'state', 'concept', 'notification-date',  'actions'];

  constructor(
    private router:Router,
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getEnvios2().subscribe(
      (data:Notification[]) => this.dataSource = data
    )
  }

  public navToNotificationView(notification:Notification) {
    this.router.navigate(['/carpeta-del-ciudadano/notification-view/' + notification.envioDestinatario])
  }
}

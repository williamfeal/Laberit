import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from './../../../../services/acli-service/notification.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {

  public notification:Notification;

  constructor(
    private notificationService:NotificationService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotificationById(this.activatedRoute.snapshot.params.id).subscribe(
      data => this.notification = data
    )
  }

}

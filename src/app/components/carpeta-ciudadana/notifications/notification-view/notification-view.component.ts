import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from './../../../../services/acli-service/notification.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {

  public notification:Notification;
  public dataSource:FileModel[];
  public displayedColumns = ['date', 'name', 'actions']
  constructor(
    private notificationService:NotificationService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotificationById(this.activatedRoute.snapshot.params.id).subscribe(
      data => this.notification = data
    );
    this.notificationService.getNotificationDocuments(this.activatedRoute.snapshot.params.id).subscribe(
      data => this.dataSource = data
    )
  }

  public navToSign() {
    this.router.navigate(['/carpeta-del-ciudadano/sign-notification/id']);
  }



}

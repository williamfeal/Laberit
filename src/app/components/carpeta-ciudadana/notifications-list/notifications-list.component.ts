import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Notification } from 'src/app/models/notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  public dataSource:Notification[] = [{
    concept: 'orueba',
    state: 'prueba',
    actualization_date: new Date(),
    notification_date: new Date()
  }];
  public displayedColumns = [ 'state', 'concept', 'notification-date', 'actualization-date', 'actions'];

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }

  
}

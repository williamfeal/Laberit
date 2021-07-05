import { Component, OnInit } from '@angular/core';
import { StyleService } from 'src/app/services/moges-services/style.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public src_logo;

  constructor(
    private styleService:StyleService
  ) { }

  ngOnInit(): void {
    this.styleService.getStyles().subscribe(
      data => {
        this.src_logo = data.logo2;
      }
    )
  }

}

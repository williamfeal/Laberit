import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

  public keywords:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  public onSearch() {
    this.router.navigate(['/catalogo-de-procedimientos'], {
      queryParams: {
        keywords: this.keywords
      }
    })
  }

}

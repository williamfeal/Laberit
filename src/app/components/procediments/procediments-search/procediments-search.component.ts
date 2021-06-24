import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { resolve } from 'dns';
import { Category } from 'src/app/models/category.model';
import { Procediment } from 'src/app/models/procediment.model';
import { AuthService } from 'src/app/services/moges-services/auth.service';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';

@Component({
  selector: 'app-procediments-search',
  templateUrl: './procediments-search.component.html',
  styleUrls: ['./procediments-search.component.scss']
})
export class ProcedimentsSearchComponent implements OnInit {

  public title:string;
  public categories:Category[];
  public categoriesShow:Category[];
  public keywords:string;
  public loading:boolean;

  constructor(
    private translateService: TranslateService,
    private categoriesService:CategoriesService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.keywords = this.activatedRoute.snapshot.queryParams.keywords;
    this.translateService.get('procediments-search').subscribe(
      data => {
        this.title = data.title
      }
    );
    this.loadData();
  }

  private loadData() {
    this.categoriesService.getAllCategories().subscribe(
      async categories => {
        this.loading = true;
        this.categories = categories;
        Promise.all(
          categories.map(async(category) => {
            const procedures = await this.categoriesService.getCategoryProcediments(category.id).toPromise();
            category.procedimientos = procedures;
          })
        ).then(
          () => {
            this.categoriesShow = categories;
            if(this.keywords.length) this.onSearch();
            this.loading = false;
          }
        )
      
      }
    );
  }

  private searchProcediments(procediments:Procediment[]) {
      return procediments?.find(
        procediment => {
          return procediment.name ?
             procediment.name.toLocaleLowerCase().includes(this.keywords.toLocaleLowerCase()) : false  
        });
  }

  public onSearch() {
    this.categoriesShow = this.categories.filter(
      category => {
        if ((category.name && category.name.toLocaleLowerCase().includes(this.keywords.toLocaleLowerCase())) || 
          this.searchProcediments(category?.procedimientos)) {
            return category;
          }
      } 
    );
  }
}

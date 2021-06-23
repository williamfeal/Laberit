import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private translateService: TranslateService,
    private categoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this.translateService.get('procediments-search').subscribe(
      data => {
        this.title = data.title
      }
    );
    this.loadData();
  }

  private loadData() {
    this.categoriesService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        this.categories.forEach(
          (category) => {
            this.categoriesService.getCategoryProcediments(category.id).subscribe(
              procedures => category.procedimientos = procedures
            )
          });
          this.categoriesShow = categories;
      });
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

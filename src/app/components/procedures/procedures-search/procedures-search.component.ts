import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/models/category.model';
import { Procedure } from 'src/app/models/procedure.model';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';
import { LanguagesService } from 'src/app/services/moges-services/language.service';

@Component({
  selector: 'app-procedures-search',
  templateUrl: './procedures-search.component.html',
  styleUrls: ['./procedures-search.component.scss']
})
export class ProceduresSearchComponent implements OnInit {

  public title:string;
  public categories:Category[];
  public categoriesShow:Category[];
  public keywords:string;
  public loading:boolean;

  private lang = this.translateService.currentLang;

  constructor(
    private translateService: TranslateService,
    private categoriesService:CategoriesService,
    private activatedRoute:ActivatedRoute,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    this.keywords = this.activatedRoute.snapshot.queryParams.keywords;
    this.translateService.get('procedures-search').subscribe(
      data => {
        this.title = data.title
      }
    );
    if(this.lang) 
      this.loadData();
    
    this.languageService.lang.subscribe(
      lang => {
        this.lang = lang;
        this.loadData();
      }
    )
  }

  private loadData() {
    this.categoriesService.getAllCategories(this.lang).subscribe(
      async categories => {
        this.loading = true;
        this.categories = categories;
        Promise.all(
          categories.map(async(category) => {
            const procedures = await this.categoriesService.getCategoryProcedures(category.id, this.lang).toPromise();
            category.procedimientos = procedures;
          })
        ).then(
          () => {
            this.categoriesShow = categories;
            this.loading = false;
            if(this.keywords && this.keywords.length) {
              this.onSearch();
            } 
          });
      });
  }

  private searchProcedures(procedures:Procedure[]) {
      return procedures?.find(
        procedure => {
          return procedure.name ?
             procedure.name.toLocaleLowerCase().includes(this.keywords.toLocaleLowerCase()) : false  
        });
  }

  public onSearch() {
    this.categoriesShow = this.categories.filter(
      category => {
        if ((category.name && category.name.toLocaleLowerCase().includes(this.keywords.toLocaleLowerCase())) || 
          this.searchProcedures(category?.procedimientos)) {
            return category;
          }
      } 
    );
  }
}

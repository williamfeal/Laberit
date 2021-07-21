import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/models/category.model';
import { Procedure } from 'src/app/models/procedure.model';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';
import { LanguagesService } from 'src/app/services/moges-services/language.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent implements OnInit {

  public categories:Category[];
  public selectedCategory:Category;

  private selectedId:string;
  private lang = this.translateService.currentLang;

  constructor(
    private categoriesService:CategoriesService,
    private activatedRoute: ActivatedRoute,
    private translateService:TranslateService,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    this.languageService.lang.subscribe(
      lang => {
        this.lang = lang;
        this.loadData();
      }
    )
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.selectedId = params.get('idCategory');
        if(this.lang) this.loadData();
        window.scrollTo({top: 0});
      }
    )
  }

  private loadData() {
    this.categoriesService.getAllCategories(this.lang).subscribe(
      (categories:Category[]) => {
        this.categories = categories;
        this.categories.forEach(  
          (category:Category) => {
            this.categoriesService.getCategoryProcedures(category.id, this.lang).subscribe(
              (procedures:Procedure[]) => category.procedimientos = procedures
            )
            if(category.id === this.selectedId) this.selectedCategory = category;
          });
      });
  }
}
 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Procediment } from 'src/app/models/procediment.model';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';

@Component({
  selector: 'app-procediments',
  templateUrl: './procediments.component.html',
  styleUrls: ['./procediments.component.scss']
})
export class ProcedimentsComponent implements OnInit {

  public categories:Category[];

  private selectedId:string;
  public selectedCategory:Category;

  constructor(
    private categoriesService:CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.selectedId = params.get('idCategory');
        this.loadData();
        window.scrollTo({top: 0});
      }
    )
    
  }

  private loadData() {
    this.categoriesService.getAllCategories().subscribe(
      (categories:Category[]) => {
        this.categories = categories;
        this.categories.forEach(  
          (category:Category) => {
            this.categoriesService.getCategoryProcediments(category.id).subscribe(
              (procedures:Procediment[]) => category.procedimientos = procedures
            )
            if(category.id === this.selectedId) this.selectedCategory = category;
          });
      });
  }
}

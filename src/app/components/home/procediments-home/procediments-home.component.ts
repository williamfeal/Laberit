import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/moges-services/auth.service';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-procediments-home',
  templateUrl: './procediments-home.component.html',
  styleUrls: ['./procediments-home.component.scss']
})
export class ProcedimentsHomeComponent implements OnInit {

  public categories:Category[];

  constructor(
    private categoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();   
  }

  private getCategories(): void {
    this.categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    }, error => SwalUtils.showSimpleAlert(AppConstants.TITLE_ERROR, AppConstants.ERROR_LOAD_CATEGORIES, 'info'));
  }

}

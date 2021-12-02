import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/moges-services/categories.service';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-procedures-home',
  templateUrl: './procedures-home.component.html',
  styleUrls: ['./procedures-home.component.scss']
})
export class ProceduresHomeComponent implements OnInit {

  public categories: Category[];
  private lang = this.translateService.currentLang;
  loading: boolean = true;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private translateService: TranslateService,
    private languageService: LanguagesService
  ) {
    console.log(window.sessionStorage);
   }

  ngOnInit(): void {
    this.languageService.lang.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      lang => {
        this.lang = lang;
        this.getCategories();
      }
    )
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesService.getAllCategories(this.lang).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((categories: Category[]) => {
      this.loading = false;
      this.categories = categories;
    }, error => SwalUtils.showSimpleAlert(AppConstants.TITLE_ERROR, AppConstants.ERROR_LOAD_CATEGORIES, 'info'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../utils/active-params.util";
import {Subscription} from "rxjs";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {

  @Input() category!: CategoryType;
  isActiveSorting = false;
  activeParams: ActiveParamsType = {categories: []};

  observableActivatedRoute: Subscription = new Subscription();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.observableActivatedRoute = this.activatedRoute.queryParams.subscribe(params => {


      this.activeParams = ActiveParamsUtil.processParams(params);

      //для перезагрузки страницы

      if (params['categories']) {
        this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
        if (this.activeParams.categories?.includes(this.category.url)) {
          this.isActiveSorting = true;
        } else {
          this.isActiveSorting = false;
        }
      }

    });
  }

  updateFilterParam(): void {
    this.isActiveSorting = !this.isActiveSorting;

    if (this.activeParams && this.activeParams.categories.length > 0) {
      const existingTypeParams = this.activeParams.categories.find(item => item === this.category.url);

      if (existingTypeParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== this.category.url);
      } else if (!existingTypeParams) {
        this.activeParams.categories = [...this.activeParams.categories, this.category.url];
      }
    } else {
      this.activeParams.categories = [this.category.url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });

  }

  ngOnDestroy() {
    this.observableActivatedRoute.unsubscribe();
  }

}

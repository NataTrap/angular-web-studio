import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {BlogType} from "../../../../types/blog.type";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  categories: CategoryType[] = [];
  articles: BlogType[] = [];
  sortingOpen = false;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];
  pages: number[] = [];

  observableCategoryService: Subscription = new Subscription();
  observableActivatedRoute: Subscription = new Subscription();
  observableArticleService: Subscription = new Subscription();

  constructor(private categoryService: CategoryService,
              private articleServices: ArticleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.observableCategoryService = this.categoryService.getCategory()
      .subscribe((data: CategoryType[]) => {
        this.categories = data;


        this.observableActivatedRoute = this.activatedRoute.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);
            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {

              const foundType = this.categories.find(item => item.url === url);
              if (foundType) {
                this.appliedFilters.push({
                  name: foundType.name,
                  urlParam: foundType.url
                });
              }


            });


            this.observableArticleService = this.articleServices.getArticles(this.activeParams)
              .subscribe((data: { count: number, pages: number, items: BlogType[] }) => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }

                this.articles = data.items;

              });


          });


      });

  }

  toggleOpen(): void {
    this.sortingOpen = !this.sortingOpen;
  }

  @HostListener('document:click', ['$event'])
  click(event: Event): void {

    // console.log(
    //   (event.target as Element).closest('.blog-sorting'),
    //   (event.target as Element).closest('.blog-applied-filters')
    // );

    if (!(
      (event.target as Element).closest('.blog-sorting') ||
      (event.target as Element).closest('.blog-applied-filters')
    )) {
      this.sortingOpen = false;
    }

  }

  removeAppliedFilter(appliedFilter: AppliedFilterType): void {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number): void {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage(): void {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  ngOnDestroy() {
    this.observableCategoryService.unsubscribe();
    this.observableActivatedRoute.unsubscribe();
    this.observableArticleService.unsubscribe();
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {HttpClientModule} from "@angular/common/http";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import {RouterModule} from "@angular/router";
import { DatePipe } from './pipes/date.pipe';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    ArticleCardComponent,
    CategoryFilterComponent,
    DatePipe,
    CommentItemComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    ArticleCardComponent,
    CategoryFilterComponent,
    DatePipe,
    CommentItemComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

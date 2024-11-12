import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { BlogComponent } from './blog/blog.component';
import {SharedModule} from "../../shared/shared.module";
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }

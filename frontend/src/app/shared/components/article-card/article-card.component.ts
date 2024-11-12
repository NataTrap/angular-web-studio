import {Component, Input} from '@angular/core';
import {BlogType} from "../../../../types/blog.type";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {

  @Input() article!: BlogType;

}

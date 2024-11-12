import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {ActiveParamsType} from "../../../types/active-params.type";
import {BlogType} from "../../../types/blog.type";
import {ArticleType} from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles(): Observable<BlogType[]> {
    return this.http.get<BlogType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<{count: number, pages: number, items: BlogType[]}> {
    return this.http.get<{count: number, pages: number, items: BlogType[]}>(environment.api + 'articles', {
      params: params
    });
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url: string): Observable<BlogType[]> {
    return this.http.get<BlogType[]>(environment.api + 'articles/related/' + url);
  }

}

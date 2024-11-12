import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {OtherCommentType} from "../../../types/article.type";
import {Observable, pipe, tap} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ActionForCommentType} from "../../../types/action-for-comment.type";
import {ActionFromUserForComment} from "../../../types/action-from-user-for-comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  likesCount: number = 0;
  dislikesCount: number = 0;

  constructor(private http: HttpClient) { }

  getComments(offsetNumber: number, article: string): Observable<OtherCommentType> {
    return this.http.get<OtherCommentType>(environment.api + 'comments?offset=' +  offsetNumber + '&article=' + article);
  }


  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  applyAction(idOfComment: string, action: ActionForCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + idOfComment + '/apply-action', {
      action: action
    });
  }

  getActionsForComment(idOfComment: string): Observable<ActionFromUserForComment[]> {
    return this.http.get<ActionFromUserForComment[]>(environment.api + 'comments/' + idOfComment + '/actions');

  }




}

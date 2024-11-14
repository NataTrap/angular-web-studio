import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleType, CommentType} from "../../../../types/article.type";
import {ActionForCommentType} from "../../../../types/action-for-comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentService} from "../../services/comment.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActionFromUserForComment} from "../../../../types/action-from-user-for-comment";
import {AuthService} from "../../../core/auth/auth.service";
import {Subscription} from "rxjs";
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  @Input() articleDetailComment!: CommentType;
  isLogged = false;
  actionForCommentTypeLike: ActionForCommentType = ActionForCommentType.like;
  actionForCommentTypeDislike: ActionForCommentType = ActionForCommentType.dislike;
  actionForCommentTypeViolate: ActionForCommentType = ActionForCommentType.violate;
  showBlueActionLike = false;
  showBlueActionDislike = false;
  likesCount: number = 0;
  dislikesCount: number = 0;
  observableAuthService: Subscription = new Subscription();
  observableCommentService: Subscription = new Subscription();
  observableCommentServiceApply: Subscription = new Subscription();

  articleDetail: ArticleType;
  quantityInArrayOfComments: number = 0;


  constructor(private _snackBar: MatSnackBar,
              private commentService: CommentService,
              private authService: AuthService,
              private _cdr: ChangeDetectorRef) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.articleDetail =
      {
        text: '',
        comments: [
          {
            id: '',
            text: '',
            date: '',
            likesCount: 0,
            dislikesCount: 0,
            user: {
              id: '',
              name: ''
            }
          }
        ],
        commentsCount: 0,
        id: '',
        title: '',
        description: '',
        image: '',
        date: '',
        category: '',
        url: ''
      }
  }

  ngOnInit() {
    this.observableAuthService = this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    if (this.isLogged) {
      this.observableCommentService = this.commentService.getActionsForComment(this.articleDetailComment.id)
        .subscribe((data: ActionFromUserForComment[]) => {
          data.forEach((item: ActionFromUserForComment) => {
            if (item.comment === this.articleDetailComment.id) {
              if (item.action === this.actionForCommentTypeLike) {
                this.showBlueActionLike = true;
                this.likesCount = 1
              }
              if (item.action === this.actionForCommentTypeDislike) {
                this.showBlueActionDislike = true;
                this.dislikesCount = 1

              }
            }
          });
        });
    }

  }

  doAction(idOfComment: string, action: ActionForCommentType): void {
    if (this.isLogged) {
      this.observableCommentServiceApply = this.commentService.applyAction(idOfComment, action)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              if (action === this.actionForCommentTypeLike) {
                this._snackBar.open('Ваш голос учтен');
                this.showBlueActionDislike = false;
                this.showBlueActionLike = !this.showBlueActionLike
                if (this.showBlueActionLike) {
                  this.likesCount = 1
                } else {
                  if (!this.showBlueActionLike) {
                    this.likesCount = 0
                  }
                }
              } else {
                if (action === this.actionForCommentTypeDislike) {
                  this.likesCount = 0
                }
              }

              if (action === this.actionForCommentTypeDislike) {
                this._snackBar.open('Ваш голос учтен');
                this.showBlueActionLike = false;
                this.showBlueActionDislike = !this.showBlueActionDislike;

                if (this.showBlueActionDislike) {
                  this.dislikesCount = 1
                } else {
                  if (!this.showBlueActionDislike) {
                    this.dislikesCount = 0
                  }
                }

              } else {
                if (action === this.actionForCommentTypeLike) {
                  this.dislikesCount = 0
                }
              }

              if (action === this.actionForCommentTypeViolate) {
                this._snackBar.open('Жалоба отправлена');
              }
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open('Жалоба уже отправлена');
            }
          }
        });

    } else {
      this._snackBar.open('Для совершения действия необходимо войти в систему или зарегистрироваться')
    }

  }

  ngOnDestroy() {
    this.observableAuthService.unsubscribe();
    this.observableCommentService.unsubscribe();
    this.observableCommentServiceApply.unsubscribe();
  }

}

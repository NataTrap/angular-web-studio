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

  articleDetail!: ArticleType;
  quantityInArrayOfComments: number = 0;


  constructor(private _snackBar: MatSnackBar,
              private commentService: CommentService,
              private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.observableAuthService = this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    // this.commentService.getComments(3, '63ca02683fe296dbe1e873e2')
    //   .subscribe(data => {
    //     // console.log(data.comments)
    //   })


    if (this.isLogged) {
      this.observableCommentService = this.commentService.getActionsForComment(this.articleDetailComment.id)
        .subscribe((data: ActionFromUserForComment[]) => {
          data.forEach((item: ActionFromUserForComment) => {
            if (item.comment === this.articleDetailComment.id) {
              if (item.action === this.actionForCommentTypeLike) {

                this.showBlueActionLike = true;


              }
              if (item.action === this.actionForCommentTypeDislike) {
                this.showBlueActionDislike = true;
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
                this.articleDetailComment.dislikesCount--
                this.articleDetailComment.likesCount++
                this._snackBar.open('Ваш голос учтен');
                this.showBlueActionDislike = false;
                this.showBlueActionLike = !this.showBlueActionLike;
              }

              if (action === this.actionForCommentTypeDislike) {
                this.articleDetailComment.likesCount--
                this.articleDetailComment.dislikesCount++
                this._snackBar.open('Ваш голос учтен');
                this.showBlueActionLike = false;
                this.showBlueActionDislike = !this.showBlueActionDislike;

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

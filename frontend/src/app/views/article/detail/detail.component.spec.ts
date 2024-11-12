import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DetailComponent} from "./detail.component";
import {ArticleService} from "../../../shared/services/article.service";
import {CommentService} from "../../../shared/services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoaderService} from "../../../shared/services/loader.service";
import {ArticleType} from "../../../../types/article.type";

describe('detail component', () => {

  let detailComponent: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let articleDetail: ArticleType;

  beforeEach(() => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle', 'getRelatedArticles']);
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['getComments', 'addComment']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params', 'addComment']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsLoggedIn', 'addComment']);
    const _snackBareSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);

    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        {provide: ArticleService, useValue: articleServiceSpy},
        {provide: CommentService, useValue: commentServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: MatSnackBar, useValue: _snackBareSpy},
        {provide: LoaderService, useValue: loaderServiceSpy},
      ]
    });

    fixture = TestBed.createComponent(DetailComponent);
    detailComponent = fixture.componentInstance;

    articleDetail = {
      text: 'hi',
      comments: [
        {
          id: 'hi',
          text: 'hi',
          date: 'hi',
          likesCount: 1,
          dislikesCount: 1,
          user: {
            id: 'hi',
            name: 'hi'
          }
        }
      ],
      commentsCount: 1,
      id: 'hi',
      title: 'hi',
      description: 'hi',
      image: 'hi',
      date: 'hi',
      category: 'hi',
      url: 'hi'
    }

    detailComponent.articleDetail = articleDetail;

  });

  it('should hide extra-data if it is isLogged', (done: DoneFn) => {

    detailComponent.isLogged = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const extraDataElement: HTMLElement | null = componentElement.querySelector('.extra-data.extra-not-logged');

      expect(extraDataElement).not.toBe(null);
      done();
    });


  });

});

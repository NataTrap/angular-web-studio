import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  nameOfUser: string = '';

  observableAuthService: Subscription = new Subscription();
  observableAuthServiceLogout: Subscription = new Subscription();
  observableAuthServiceGet: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {

    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.observableAuthService = this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      this.getNameOfUser();
    });

    this.getNameOfUser();

  }

  logout(): void {
    this.observableAuthServiceLogout = this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы успешно вышли из системы');
    this.router.navigate(['/']);
  }

  getNameOfUser(): void {
    if (this.isLogged) {
      this.observableAuthServiceGet = this.authService.getUserInfo()
        .subscribe((data: UserInfoType | DefaultResponseType) => {
          const userInfo = data as UserInfoType;
          this.nameOfUser = userInfo.name;
        })
    }
  }

  ngOnDestroy() {
    this.observableAuthService.unsubscribe();
    this.observableAuthServiceLogout.unsubscribe();
    this.observableAuthServiceGet.unsubscribe();
  }

}

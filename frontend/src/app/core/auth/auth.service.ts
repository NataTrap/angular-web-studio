import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {LoginResponseType} from "../../../types/login-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment.development";
import {UserInfoType} from "../../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  isLogged$: Subject<boolean> = new Subject<boolean>();
  isLogged: boolean = false;

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'login', {
      email, password, rememberMe
    });
  }

  signup(name: string, email: string, password: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'signup', {
      name, email, password
    });
  }

  refresh(): Observable<LoginResponseType | DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'signup', {
        refreshToken: tokens.refreshToken
      });
    }

    throw throwError(() => 'Can not use token');
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();

    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      });
    }

    throw throwError(() => 'Can not find token');

  }

  getUserInfo(): Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'users');
  }

  public getIsLoggedIn(): boolean {
    return this.isLogged;
  }

  public getTokens(): {accessToken: string | null, refreshToken: string | null} {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(userId: string | null) {
    if (userId) {
      localStorage.setItem(this.userIdKey, userId);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }

}

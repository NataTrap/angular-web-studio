import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isShowed = new Subject<boolean>();

  show() {
    this.isShowed.next(true);
  }

  hide() {
    this.isShowed.next(false);
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isShowed: boolean = false;

  observableLoaderService: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.isShowed.subscribe((isShowed: boolean) => {
      this.isShowed = isShowed;
    });
  }

  ngOnDestroy() {
    this.observableLoaderService.unsubscribe();
  }

}

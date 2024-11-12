import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {MainServicesType} from "../../../types/main-services.type";
import {ArticleService} from "../../shared/services/article.service";
import {BlogType} from "../../../types/blog.type";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestEnum, RequestType} from "../../../types/request.type";
import {RequestService} from "../../shared/services/request.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {Subscription} from "rxjs";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  articles: BlogType[] = [];
  isShowPopupService = false;

  requestEnumOrder: RequestEnum = RequestEnum.order;
  isShowErrorAfterRequest = false;
  isShowThanks = false;
  observableArticleService: Subscription = new Subscription();
  observableRequestService: Subscription = new Subscription();

  constructor(private articleService: ArticleService,
              private fb: FormBuilder,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.observableArticleService = this.articleService.getPopularArticles()
      .subscribe((data: BlogType[]) => {
        this.articles = data;
      });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  servicesItems: MainServicesType[] = [
    {
      image: 'services-1.png',
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500'
    },
    {
      image: 'services-2.png',
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500'
    },
    {
      image: 'services-3.png',
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000'
    },
    {
      image: 'services-4.png',
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750'
    },

  ];

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'АйтиШторм проявила себя как профессиональная, оперативная, ответственная и современная команда, которая четко понимает требования заказчика и помогает их формулировать.'
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'АйтиШторм — лучшая веб-студия. Рада, что обратилась именно к ним! Объясняли каждый шаг простым языком, что было особенно ценно для нас, неопытных заказчиков. Благодарим!'
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Очень помогли нам с продвижением сайта, компания заслуживает самых теплых отзывов! Их подход к работе впечатлил. '
    },
    {
      name: 'Александр',
      image: 'review7.jpg',
      text: 'Обратились за комплексным продвижением сайта. Все оговоренное выполнили, работой довольны, менеджер на связи, специалисты грамотные. Попали в топ, компанию рекомендую.'
    }
  ];

  isShowPopupServices(title: string): void {
    this.selectedService = title;
    this.isShowPopupService = true;
  }


  isClosePopupServices(): void {
    this.isShowPopupService = false;
    this.isShowErrorAfterRequest = false;
    this.popupServiceForm.controls['phone'].setValue('');
    this.popupServiceForm.controls['name'].setValue('');
    this.popupServiceForm.markAsPristine();
    this.popupServiceForm.markAsUntouched();
  }

  isCloseThanks(): void {
    this.isShowThanks = false;
    this.popupServiceForm.controls['phone'].setValue('');
    this.popupServiceForm.controls['name'].setValue('');
    this.popupServiceForm.markAsPristine();
    this.popupServiceForm.markAsUntouched();
  }

  selectedService = this.servicesItems[0].title;

  popupServiceForm = this.fb.group({
    phone: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });

  test(v: MatSelectChange): void {
    // console.log(v.value);
    this.selectedService = v.value;
  }

  addRequest(type: RequestEnum): void {

    if (this.selectedService && this.popupServiceForm.valid && this.popupServiceForm.value.phone && this.popupServiceForm.value.name) {

      let requestInfo: RequestType = {
        name: this.popupServiceForm.value.name,
        phone: this.popupServiceForm.value.phone,
        type: type,
        service: this.selectedService
      }

      this.observableRequestService = this.requestService.addRequest(requestInfo)
        .subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            this.isClosePopupServices();
            this.isShowThanks = true;
            this.isShowErrorAfterRequest = false;
          } else {
            this.isShowErrorAfterRequest = true;
          }

        });

    }

  }

  ngOnDestroy() {
    this.observableArticleService.unsubscribe();
    this.observableRequestService.unsubscribe();
  }

}

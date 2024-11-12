import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {RequestEnum, RequestType} from "../../../../types/request.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {

  requestEnumConsultation: RequestEnum = RequestEnum.consultation;
  isShowConsultation = false;
  isShowErrorAfterRequest = false;
  isShowThanks = false;

  observableRequestService: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private requestService: RequestService) {
  }


  isShowConsultations(): void {
    this.isShowConsultation = true;
  }

  isCloseConsultations(): void {
    this.isShowConsultation = false;
    this.isShowErrorAfterRequest = false;
    this.consultationForm.controls['phone'].setValue('');
    this.consultationForm.controls['name'].setValue('');
    this.consultationForm.markAsPristine();
    this.consultationForm.markAsUntouched();
  }

  isCloseThanks(): void {
    this.isShowThanks = false;
    this.consultationForm.controls['phone'].setValue('');
    this.consultationForm.controls['name'].setValue('');
    this.consultationForm.markAsPristine();
    this.consultationForm.markAsUntouched();
  }

  consultationForm = this.fb.group({
    phone: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });

  addRequest(type: RequestEnum): void {

    if (this.consultationForm.valid && this.consultationForm.value.phone && this.consultationForm.value.name) {

      let requestInfo: RequestType = {
        name: this.consultationForm.value.name,
        phone: this.consultationForm.value.phone,
        type: type
      }

      this.observableRequestService = this.requestService.addRequest(requestInfo)
        .subscribe((data: DefaultResponseType) => {
          if (!data.error) {
            this.isCloseConsultations();
            this.isShowThanks = true;
            this.isShowErrorAfterRequest = false;
          } else {
            this.isShowErrorAfterRequest = true;
          }

        });

    }

  }

  ngOnDestroy() {
    this.observableRequestService.unsubscribe();
  }

}

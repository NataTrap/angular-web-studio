import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);

    let dateDay: any = date.getDate();
    if (dateDay <= 9) {
      dateDay = '0' + String(dateDay);
    }

    let dateMonth: any = date.getMonth() + 1;
    if (dateMonth <= 9) {
      dateMonth = '0' + String(dateMonth);
    }
    let dateFullYear = date.getFullYear();

    let dateHours: any = date.getHours();
    if (dateHours <= 9) {
      dateHours = '0' + String(dateHours);
    }

    let dateMinutes: any = date.getMinutes();
    if (dateMinutes <= 9) {
      dateMinutes = '0' + String(dateMinutes);
    }

    return dateDay + '.' + dateMonth + '.' + dateFullYear + ' ' + dateHours + ':' + dateMinutes;
  }

}

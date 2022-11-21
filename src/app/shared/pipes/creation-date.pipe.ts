import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate'
})
export class CreationDatePipe implements PipeTransform {

  transform(date: string): string {
    const [day, month, year] = date.split('/');
    return `${day}.${month}.${year}`;
  }
}

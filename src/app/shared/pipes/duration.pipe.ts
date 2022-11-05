import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    if (duration) {
      const hours: number = Math.floor(duration / 60);
      const minutes: number = duration - (hours * 60);
  
      const hoursResponse: string = hours < 10 ? `0${hours}` : hours.toString();
      const minutesResponse: string = minutes < 10 ? `0${minutes}`: minutes.toString(); 
  
      return `${hoursResponse}:${minutesResponse} hours`;
    } else {
      return '00:00 hours';
    }
  }

}

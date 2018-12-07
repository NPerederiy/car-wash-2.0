import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {  

  transform(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}

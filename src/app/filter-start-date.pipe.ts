import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterStartDate'
})
export class FilterStartDatePipe implements PipeTransform {


  transform(tasks: TaskVO[], startDateSearch: Date): any[] {
    console.log(startDateSearch);
    return tasks.filter(it => {
      return new Date(it.start_date).getTime() >= new Date(startDateSearch).getTime();
    });
  }

}

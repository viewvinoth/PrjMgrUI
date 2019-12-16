import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterEndDate'
})
export class FilterEndDatePipe implements PipeTransform {

  transform(tasks:TaskVO[], endDateSearch:string): any[] {
    console.log("end date" + endDateSearch );
    var results:TaskVO[] = new Array();
    tasks.forEach(it => {
      if (it.end_date) {
        if (new Date(it.end_date).getTime() <= new Date(endDateSearch).getTime()) {
          results.push(it);
        }
      } else {
        results.push(it);
      }
    });
    return results;
  }

}

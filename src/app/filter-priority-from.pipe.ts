import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterPriorityFrom'
})
export class FilterPriorityFromPipe implements PipeTransform {

  transform(tasks: TaskVO[], priorityFromSearch: number): any[] {
    console.log(priorityFromSearch);
    console.log(tasks);

    return tasks.filter( it => {
      return it.priority >= priorityFromSearch;
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterPriorityTo'
})
export class FilterPriorityToPipe implements PipeTransform {

  transform(tasks: TaskVO[], priorityToSearch: number): any[] {
    return tasks.filter( it => {
      return it.priority <= priorityToSearch;
    });
  }

}

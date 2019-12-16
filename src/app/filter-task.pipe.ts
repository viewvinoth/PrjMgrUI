import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: TaskVO[], taskSearch: string): any[] {
    console.log (tasks);
    console.log (taskSearch);
    return tasks.filter(it => { return it.task.toLowerCase().includes(taskSearch.toLowerCase()) });
  }

}

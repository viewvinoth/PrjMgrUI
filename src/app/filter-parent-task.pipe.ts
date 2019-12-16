import { Pipe, PipeTransform } from '@angular/core';
import { TaskVO } from './task';

@Pipe({
  name: 'filterParentTask'
})
export class FilterParentTaskPipe implements PipeTransform {

  transform(tasks: TaskVO[], parentTaskSearch: string): any[] {
    return tasks.filter(it => { return it.parenttask.toLowerCase().includes(parentTaskSearch.toLowerCase()); }
    );
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { project } from './project';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(projects: project[], searchStr: string): any[] {
    console.log(projects);
    console.log(searchStr);
    return projects.filter(it => { return (it.project.toLowerCase()).includes(searchStr.toLowerCase()) });
  }

}

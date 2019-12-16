import { Pipe, PipeTransform } from '@angular/core';
import { user } from './user';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(users: user[], searchStr: string): any[] {
    console.log(users);
    console.log(searchStr);
    return users.filter(it => { return (it.firstName.toLowerCase()+it.lastName.toLowerCase()+it.employeeId.toLowerCase()).includes(searchStr.toLowerCase()) });
  }
}

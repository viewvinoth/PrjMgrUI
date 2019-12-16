import { Pipe, PipeTransform } from '@angular/core';
import { user } from './user';

@Pipe({
  name: 'filterUserByLastAndFirstName'
})
export class FilterUserByLastAndFirstNamePipe implements PipeTransform {

  transform(users: user[], searchStr: string): any[] {
    console.log(users);
    console.log(searchStr);
    return users.filter(it => { return (it.firstName.toLowerCase()+it.lastName.toLowerCase()).includes(searchStr.toLowerCase()) });
  }

}

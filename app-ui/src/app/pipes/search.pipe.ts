import { Pipe, PipeTransform } from '@angular/core';
import { Follower } from '../shared/intrfaces';

@Pipe({
  name: 'filterFollowers'
})
export class SearchPipe implements PipeTransform {
  transform(users: Follower[], keyWord = ''): Follower[] {
    if (!keyWord.trim()) {
      return users;
    }

    return users.filter(user => {
      return user.name.toLowerCase().includes(keyWord.toLowerCase());
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../shared/services/user.service';
import { Follower } from '../../shared/intrfaces';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  viewerId: number;
  users: Array<Follower>;
  keyWord = '';
  uSub: Subscription;
  sort = true;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.uSub = this.userService.getAll().subscribe((response: { users: Array<Follower>, id: number }) => {
      this.viewerId = response.id;
      this.users = response.users;
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  sortAZ() {
    this.sort = true;
    this.users = this.users.sort((userA, userB) => {
      return userA.name.localeCompare(userB.name, undefined, { sensitivity: 'accent' });
    });
  }

  sortZA() {
    this.sort = false;
    this.users = this.users.sort((userA, userB) => {
      return userB.name.localeCompare(userA.name, undefined, { sensitivity: 'accent' });
    });
  }
}

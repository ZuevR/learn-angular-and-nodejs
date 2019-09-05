import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

import { Follower } from '../../shared/intrfaces';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  viewerId: number;
  users: Array<Follower>;
  keyWord = '';

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe((response: { users: Array<Follower>, id: number }) => {
      console.log(response);
      this.viewerId = response.id;
      this.users = response.users;
    });
  }

}

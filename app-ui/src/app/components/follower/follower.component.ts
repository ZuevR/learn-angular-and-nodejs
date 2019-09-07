import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Follower } from '../../shared/intrfaces';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit, OnDestroy {

  @Input() follower: Follower;
  @Input() id: number;
  tSub: Subscription;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  toggle() {
    this.tSub = this.userService.toggleFollow(this.follower.id).subscribe(response => {
      if (response.message === 'created') {
        this.follower.follower = this.id;
      } else if (response.message === 'deleted') {
        this.follower.follower = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
  }
}

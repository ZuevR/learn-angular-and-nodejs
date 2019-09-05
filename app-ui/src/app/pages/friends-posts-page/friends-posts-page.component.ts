import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/intrfaces';

import { Subscription } from 'rxjs';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-friends-posts-page',
  templateUrl: './friends-posts-page.component.html',
  styleUrls: ['./friends-posts-page.component.scss']
})
export class FriendsPostsPageComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  pSub: Subscription;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.pSub = this.postService.getFriendsPosts().subscribe(response => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/intrfaces';

import { Subscription } from 'rxjs';
import { PostService } from '../../shared/services/post.service';
import { SortService } from '../../shared/services/sort.service';

@Component({
  selector: 'app-friends-posts-page',
  templateUrl: './friends-posts-page.component.html',
  styleUrls: ['./friends-posts-page.component.scss']
})
export class FriendsPostsPageComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  pSub: Subscription;
  sSub: Subscription;

  constructor(
    private postService: PostService,
    private sortService: SortService
  ) { }

  ngOnInit() {
    this.sSub = this.sortService.subj$.subscribe(direction => {
      this.posts = this.sortService.handleSort(this.posts, direction);
    });

    this.pSub = this.postService.getFriendsPosts().subscribe(response => {
      console.log(response);
      this.posts = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/intrfaces';
import { SortService } from '../../shared/services/sort.service';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.scss']
})
export class MyPostsPageComponent implements OnInit, OnDestroy {

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

    this.pSub = this.postService.getMyPosts().subscribe(response => {
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

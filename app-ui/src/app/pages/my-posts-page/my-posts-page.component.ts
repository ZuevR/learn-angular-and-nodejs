import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/intrfaces';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.scss']
})
export class MyPostsPageComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  pSub: Subscription;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.pSub = this.postService.getMyPosts().subscribe(response => {
      console.log(response);
      this.posts = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}

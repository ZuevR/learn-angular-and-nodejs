import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/intrfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  pSub: Subscription;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe((response: Array<Post>) => {
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

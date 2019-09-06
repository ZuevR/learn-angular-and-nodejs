import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/intrfaces';
import { SortService } from '../../shared/services/sort.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  pSub: Subscription;
  sSub: Subscription;

  constructor(
    private postService: PostService,
    private sortService: SortService
  ) {
  }

  ngOnInit() {
    this.sSub = this.sortService.subj$.subscribe(direction => {
      this.posts = this.sortService.handleSort(this.posts, direction);
    });

    this.pSub = this.postService.getAll().subscribe((response: Array<Post>) => {
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

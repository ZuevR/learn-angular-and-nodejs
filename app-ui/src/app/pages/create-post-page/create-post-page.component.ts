import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../shared/intrfaces';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    public postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;
    const post: Post = {
      title: this.form.get('title').value,
      content: this.form.get('content').value
    };

    this.postService.create(post).subscribe((response: Post) => {
      this.form.reset();
      this.router.navigate(['/']);
      this.submitting = false;
    }, (e) => {
      this.submitting = false;
    });
  }
}

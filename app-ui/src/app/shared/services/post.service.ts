import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Post } from '../intrfaces';

@Injectable({ providedIn: 'root' })
export class PostService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${ environment.host }/api/v1/posts/create`, post)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${ environment.host }/api/v1/posts`);
  }

  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${ environment.host }/api/v1/posts/my-posts`);
  }

  getFriendsPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${ environment.host }/api/v1/posts/friends-posts`);
  }


  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error.error.errors[0].message;
    this.error$.next(message);
    return throwError(error);
  }
}

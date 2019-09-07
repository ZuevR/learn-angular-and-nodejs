import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ environment.host }/api/v1/users`);
  }

  toggleFollow(id: number): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/users/follow`, { id });
  }
}

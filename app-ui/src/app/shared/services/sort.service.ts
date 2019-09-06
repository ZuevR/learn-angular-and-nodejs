import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SortService {

  public subj$: Subject<string> = new Subject<string>();

  handleSort(data, direction) {
    if (direction === 'down') {
      return data.sort((a, b) => a.date - b.date);
    }
    if (direction === 'up') {
      return data.sort((a, b) => b.date - a.date);
    }
  }
}

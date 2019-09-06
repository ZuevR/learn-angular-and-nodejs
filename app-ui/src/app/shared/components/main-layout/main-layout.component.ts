import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  currentPath: string;
  navStart: Observable<NavigationStart>;
  userName: string;
  uSub: Subscription;
  rSub: Subscription;
  direction = 'up';

  constructor(
    public authService: AuthService,
    public sortService: SortService,
    private router: Router
  ) {
    this.currentPath = router.url;
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.rSub = this.navStart.subscribe(event => {
      this.currentPath = event.url;
    });

    this.uSub = this.authService.getIdentity().subscribe(res => {
      this.userName = res.userName;
    }, () => {
      this.userName = 'Guest';
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.userName = 'Guest';
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  sort(direction: string) {
    this.direction = direction;
    this.sortService.subj$.next(direction);
  }
}

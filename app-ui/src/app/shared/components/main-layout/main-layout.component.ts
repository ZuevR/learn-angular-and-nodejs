import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  userName: string;

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getIdentity().subscribe(res => {
      this.userName = res.userName;
    }, () => {
      this.userName = 'Guest';
    });
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    console.log('logout');
  }
}

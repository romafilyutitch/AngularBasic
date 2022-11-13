import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth/auth.service';
import { UserStoreService } from './user/services/user-store.service';
import { UserService } from './user/services/user.service';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'courses-app';
  isUserAuthorized: boolean = false;

  constructor(private authService: AuthService, private router: Router, public userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isUserAuthorized = isAuthorized;
    })
  }

  processLogout(): void {
    this.authService.logout();
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      if (!isAuthorized) {
        this.router.navigateByUrl('/login');
      }
    })
  }
}

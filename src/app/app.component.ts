import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AuthFacade } from './auth/store/auth.facade';
import { UserStoreService } from './user/services/user-store.service';
import { UserService } from './user/services/user.service';
import { UserStateFacade } from './user/store/user.facade';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'courses-app';
  isUserAuthorized: boolean = false;
  userName: string = '';
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private authFacade: AuthFacade, private userStateFacade: UserStateFacade, private router: Router) {}

  ngOnInit(): void {
    this.subsrcibeToIsAuthorized();
    this.subscribeToUserName();
  }
  
  ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
  }

  processLogout(): void {
    this.authFacade.logout();
  }

  private subsrcibeToIsAuthorized(): void {
    this.authFacade.isAuthorized$.pipe(takeUntil(this.destroyed$))
    .subscribe(isAuthorized => {
      this.isUserAuthorized = isAuthorized;
      if (!this.isUserAuthorized) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  private subscribeToUserName(): void {
    this.userStateFacade.name$.pipe(takeUntil(this.destroyed$))
    .subscribe(userName => this.userName = userName);
  }
}

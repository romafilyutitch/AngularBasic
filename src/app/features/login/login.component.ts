import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
  }

  formSubmitted: boolean = false;
  errorMessage: string;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private authFacade: AuthFacade, private userStateFacade: UserStateFacade, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToIsAuthorized();
    this.subscribeToErrorMessage();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  processSubmitForm(form) : void {
    this.formSubmitted = true;
    if (form.valid) {
      this.authFacade.login(this.user);
    }
  }

  private subscribeToIsAuthorized(): void {
    this.authFacade.isAuthorized$.pipe(takeUntil(this.destroyed$))
    .subscribe(isAuthorized => {
      if (isAuthorized) {
        this.userStateFacade.getCurrentUser();
        this.router.navigateByUrl('/courses');
      }
    });
  }

  private subscribeToErrorMessage(): void {
    this.authFacade.getLoginErrorMessage.pipe(takeUntil(this.destroyed$))
    .subscribe(messsage => this.errorMessage = messsage);
  }

}

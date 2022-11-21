import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = {
    email: '',
    password: '',
  }

  formSubmitted: boolean = false;
  wrongData: boolean = false;
  isAuthorizedSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToIsAuthorized();
  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
  }

  processSubmitForm(form) : void {
    this.formSubmitted = true;
    if (form.valid) {
      this.authService.login(this.user);
    }
  }

  private subscribeToIsAuthorized(): void {
    this.isAuthorizedSubscription = this.authService.isAuthorized$
    .subscribe(isAuthorized => {
      if (isAuthorized) {
        this.router.navigateByUrl('/courses');
      } else if (!isAuthorized && this.formSubmitted) {
        this.wrongData = true;
      }
    });
  }

}

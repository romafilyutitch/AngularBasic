import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';
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
  wrongData: boolean = false;

  constructor(private authService: AuthService, private userStoreService: UserStoreService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this.userStoreService.getUser();
        this.router.navigateByUrl('/courses');
      } else if (!isAuthorized && this.formSubmitted) {
        this.wrongData = true;
      }
    })
  }

  processSubmitForm(form) : void {
    this.formSubmitted = true;
    if (form.valid) {
      this.authService.login(this.user);
    }
  }

}

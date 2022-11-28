import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { createEmailValidator } from 'src/app/shared/utils/emailValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private router: Router) {
  }

  errorMessage: string;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.boildForm();
    this.subscribeToErroMessage();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  processSubmit(): void {
    this.formSubmitted = true;
    if (this.registrationForm.valid) {
      this.authFacade.register(this.registrationForm.value);
      this.router.navigateByUrl('/login');
    }
  }

  private subscribeToErroMessage(): void {
    this.authFacade.getRegisterErrorMessage.pipe(takeUntil(this.destroyed$))
      .subscribe(message => this.errorMessage = message);
  }

  private boildForm(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, createEmailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}

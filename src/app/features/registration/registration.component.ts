import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createEmailValidator } from 'src/app/shared/utils/emailValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder ) {

  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, createEmailValidator()]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    }); 
  }

  processSubmit(): void {
    this.formSubmitted = true;
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

}

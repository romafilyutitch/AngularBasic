import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  formSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  processSubmitForm() : void {
    this.formSubmitted = true;
  }

}

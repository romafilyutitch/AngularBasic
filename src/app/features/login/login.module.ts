import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)
  ],
  exports: [LoginComponent, RouterModule]
})
export class LoginModule { }

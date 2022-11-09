import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

const routes : Routes = [
  {path: '', component: RegistrationComponent}
]

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [RegistrationComponent, RouterModule]
})
export class RegistrationModule { }

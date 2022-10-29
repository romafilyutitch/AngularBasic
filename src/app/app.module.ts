import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesModule } from './features/courses/courses.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CoursesModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

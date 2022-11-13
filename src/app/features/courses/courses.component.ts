import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  isEditable: boolean = true;
  modalOkButtonText: string = 'OK';
  cancellButtonText: string = 'Cancell';
  isUserAdmin: boolean;

  constructor(private coursesStoreService: CoursesStoreService,
              private router: Router,
              private userStoreService: UserStoreService) { }

  ngOnInit(): void {
    this.coursesStoreService.getAll();
    this.coursesStoreService.courses$.subscribe(course => {
      this.courses = course;
    });
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    })
  }

  serachCourses(title: string): void {
    this.coursesStoreService.searchCourse(title);
  }

  removeCourse(courseToRemove: Course): void {
    this.courses = this.courses.filter(course => course !== courseToRemove)
    this.coursesStoreService.deleteCourse(courseToRemove);
  }

  editCourse(courseToEdit: Course): void {
    this.router.navigate(['/', 'courses', 'edit', courseToEdit.id]);
  }

  showCourse(courseToShow: Course): void {
    this.router.navigate(['/', 'courses', courseToShow.id]);
  }
}

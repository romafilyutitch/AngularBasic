import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[];
  isUserAdmin: boolean;
  isLoading: boolean = false;

  coursesSubscription: Subscription;
  isAdminSubscription: Subscription;
  isLoadingSubscription: Subscription;

  constructor(public coursesStoreService: CoursesStoreService,
              private router: Router,
              public userStoreService: UserStoreService) { }

  ngOnInit(): void {
    this.coursesStoreService.getAll();
    this.userStoreService.getUser();
    this.subsrcibeToCourses();
    this.subscribeToIsAdmin();
    this.subscribeToIsLoading();
  }

  ngOnDestroy(): void {
      this.coursesSubscription.unsubscribe();
      this.isAdminSubscription.unsubscribe();
      this.isLoadingSubscription.unsubscribe();
  }

  serachCourses(title: string): void {
    this.coursesStoreService.searchCourse(title);
  }

  removeCourse(courseToRemove: Course): void {
    this.courses = this.courses.filter(course => course !== courseToRemove);
    this.coursesStoreService.deleteCourse(courseToRemove);
  }

  redirectToEditCoursePage(courseToEdit: Course): void {
    this.router.navigate(['/', 'courses', 'edit', courseToEdit.id]);
  }

  redirectToShowCoursePage(courseToShow: Course): void {
    this.router.navigate(['/', 'courses', courseToShow.id]);
  }

  private subsrcibeToCourses(): void {
    this.coursesSubscription = this.coursesStoreService.courses$.subscribe(course => this.courses = course);
  }

  private subscribeToIsAdmin(): void {
    this.isAdminSubscription = this.userStoreService.isAdmin$.subscribe(isAdmin => this.isUserAdmin = isAdmin);
  }

  private subscribeToIsLoading(): void {
    this.isLoadingSubscription = this.coursesStoreService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}

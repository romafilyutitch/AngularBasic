import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService implements OnInit, OnDestroy {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  public isLoading$: Observable<boolean>;
  public courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
      this.isLoading$ = this.isLoading$$.asObservable();
      this.courses$ = this.courses$$.asObservable();
  }

  ngOnDestroy(): void {
      this.isLoading$$.complete();
      this.courses$$.complete();
  }

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe(courses => {
      this.courses$$.next(courses);
      this.isLoading$$.next(false);
    });
  }

  getCourse(id: string) {
    this.isLoading$$.next(true);
    this.coursesService.getCourse(id).subscribe(course => {
      this.isLoading$$.next(false);
      this.courses$$.next([course])
    });
  }

  createCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe(() => {
      this.isLoading$$.next(false);
    });
  }

  editCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(course).subscribe(() => {
      this.isLoading$$.next(false);
    });
  }

  deleteCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(course).subscribe(() => {
      this.isLoading$$.next(false);
    });
  }
}

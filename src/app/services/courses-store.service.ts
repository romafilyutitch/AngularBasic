import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AuthorsStoreService } from './authors-store.service';
import { AuthorsService } from './authors.service';
import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService implements OnDestroy {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService, private authorsService: AuthorsService) { }

  ngOnDestroy(): void {
      this.isLoading$$.complete();
      this.courses$$.complete();
  }

  getAll() {
    this.isLoading$$.next(true);
    combineLatest([this.coursesService.getAll(), this.authorsService.getAll()])
    .subscribe(([courses, authors]) => {
      courses.forEach(course => course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name));
      this.isLoading$$.next(false);
      this.courses$$.next(courses);
    })
  }

  getCourse(id: string) {
    this.isLoading$$.next(true);
    combineLatest([this.coursesService.getCourse(id), this.authorsService.getAll()])
    .subscribe(([course, authors]) => {
      course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name);
      this.isLoading$$.next(false);
      this.courses$$.next([course]);
    })
  }

  searchCourse(title: string): void {
    this.isLoading$$.next(true);
    if (title) {
      combineLatest([this.coursesService.searchCourse(title), this.authorsService.getAll()])
      .subscribe(([courses, authors]) => {
        courses.forEach(course => course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name));
        this.isLoading$$.next(false);
        this.courses$$.next(courses);
      })
    } else {
      combineLatest([this.coursesService.getAll(), this.authorsService.getAll()])
      .subscribe(([courses, authors]) => {
        courses.forEach(course => course.authors = authors.filter(author => course.authors.includes(author.id)).map(author => author.name));
        this.isLoading$$.next(false);
        this.courses$$.next(courses);
      })
    }
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

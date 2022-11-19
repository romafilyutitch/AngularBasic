import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from 'src/app/services/course.model';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit, OnDestroy {

  selectedCourse: Course;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute, private coursesStateFacade: CoursesStateFacade) { }

  ngOnInit(): void {
    const courseId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.coursesStateFacade.getSingleCourse(courseId);
    this.subscribeToCourse();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private subscribeToCourse(): void {
    this.coursesStateFacade.course$.pipe(takeUntil(this.destroyed$)).subscribe(course => this.selectedCourse = course);
  }

}

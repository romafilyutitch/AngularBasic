import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  selectedCourse: Course;

  constructor(private activatedRoute: ActivatedRoute, private coursesStoreService: CoursesStoreService) { }

  ngOnInit(): void {
    const courseId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.coursesStoreService.getCourse(courseId);
    this.subscribeToCourse();
  }

  private subscribeToCourse(): void {
    const courseId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.coursesStoreService.courses$
    .pipe(first())
    .subscribe(courses => {
      this.selectedCourse = courses.find(course => course.id === courseId);
    })
  }

}

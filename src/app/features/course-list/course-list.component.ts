import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/services/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() courses: Course[];
  @Input() isEditable: boolean;
  @Output() private courseShownEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() private courseEditEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() private courseRemoveEvent: EventEmitter<Course> = new EventEmitter<Course>();

  selectedCourse: Course;
  editIcon: IconDefinition = faPencil;
  removeIcon: IconDefinition = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  emitRemoveCourseEvent(removeCourse: boolean): void {
    if (removeCourse) {
      this.courseRemoveEvent.emit(this.selectedCourse);
    }
  }

  emitCourseShowEvent(course: Course): void {
    this.courseShownEvent.emit(course);
  }

  emitCourseEditEvent(course: Course): void {
    this.courseEditEvent.emit(course);
  }

  selectCourseToRemove(course: Course): void {
    this.selectedCourse = course;
  }

}

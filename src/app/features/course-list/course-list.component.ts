import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/services/course.model';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() courses: Course[];
  @Input() isEditable: boolean;
  @Output() courseShownEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseEditEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseRemoveEvent: EventEmitter<Course> = new EventEmitter<Course>();
  selectedCourse: Course;

  courseButtonText: string = 'Show Course';

  editIcon: IconDefinition = faPencil;
  removeIcon: IconDefinition = faTrash;
  isUserAdmin: boolean = false;
  
  constructor(private userStorageService: UserStoreService) { }

  ngOnInit(): void {
    this.userStorageService.isAdmin$.subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    });
  }

  processRemoveCourseChoise(removeCourse: boolean): void {
    if (removeCourse) {
      this.courseRemoveEvent.emit(this.selectedCourse);
    }
  }
}

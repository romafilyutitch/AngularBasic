import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Input() courses: Course[];
  @Input() isEditable: boolean;
  @Output() courseShownEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseEditedEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseRemovedEvent: EventEmitter<Course> = new EventEmitter<Course>();

  courseButtonText: string = 'Show Course';

  editIcon: IconDefinition = faPencil;
  removeIcon: IconDefinition = faTrash; 

  constructor() { }

  ngOnInit(): void {
  }

}

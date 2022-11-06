import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Course } from 'src/app/shared/components/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [
    {
      title: 'Angular',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuris, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheet containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      creationDate: new Date(Date.UTC(2012, 2, 20)),
      duration: 150,
      authors: ['Dave Heisenberg', 'Tony Ja']
    },
    {
      title: 'Java',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuris, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheet containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      creationDate: new Date(Date.UTC(2017, 7, 14)),
      duration: 60,
      authors: ['Dave Simonnds', 'Valentina Lary']
    },
    {
      title: 'ASP. NET',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuris, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheet containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      creationDate: new Date(Date.UTC(2022, 5, 1)),
      duration: 210,
      authors: ['Sam Smith', 'Tony Robbins']
    }
  ]
  isEditable: boolean = true;
  selectedCourse: Course;
  modalOkButtonText: string = 'OK';
  cancellButtonText: string = 'Cancell'

  constructor() { }

  ngOnInit(): void {
  }

  openModal($event: Course) {
    this.selectedCourse = $event;
  }

  handleModalResult($event: boolean) {
    if ($event) {
      console.log('Modal was closed with ok button');
    } else {
      console.log('Modal was closed with cancel button');
    }
  }

}

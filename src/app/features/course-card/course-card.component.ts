import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: string;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() isEditable: boolean;


  constructor() { }

  ngOnInit(): void {
  }

}

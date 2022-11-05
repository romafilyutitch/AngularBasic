import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  formSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      newAuthor: this.formBuilder.group({
        authorName: ['', Validators.pattern('[a-zA-Z0-9 ]+')],
        authors: this.formBuilder.array([])
      }),
      duration: ['', [Validators.required, Validators.min(0)]]
    }); 
  }

  processSubmit(): void {
    this.formSubmitted = true;
  }

  createAuthor(): void {
    const authorNameControl : FormControl = this.courseForm.get('newAuthor').get('authorName') as FormControl;
    const authorName: string = authorNameControl.value;
    if (authorName && authorNameControl.valid) {
      const newAuthorsFormArray : FormArray =  this.courseForm.get('newAuthor').get('authors') as FormArray;
      newAuthorsFormArray.push(this.formBuilder.control(
        authorName, []
      ));
      authorNameControl.reset();
    }
  }

  removeAuthor(removeIndex: number): void {
    const newAuthorsFormArray: FormArray = this.courseForm.get('newAuthor').get('authors') as FormArray;
    newAuthorsFormArray.removeAt(removeIndex);
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get authorName() {
    return this.courseForm.get('newAuthor').get('authorName');
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get newAuthor() {
    return this.courseForm.get('newAuthor')
  }

  get authors() {
    return this.courseForm.get('newAuthor').get('authors') as FormArray;
  }

  

}

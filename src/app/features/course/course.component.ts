import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { Author } from 'src/app/services/author.model';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  formSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private coursesStorageSerivce: CoursesStoreService, 
              private authorsStorageService: AuthorsStoreService,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorsStorageService.getAll();
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      newAuthor: this.formBuilder.group({
        authorName: ['', Validators.pattern('[a-zA-Z0-9 ]+')],
        authors: this.formBuilder.array([])
      }),
      duration: ['', [Validators.required, Validators.min(0)]]
    });
    if(this.activatedRoute.snapshot.paramMap.get('id')) {
      this.coursesStorageSerivce.getCourse(this.activatedRoute.snapshot.paramMap.get('id'))
      this.coursesStorageSerivce.courses$
      .pipe(first()).subscribe(courses => {
        const foundCourse: Course = courses.find(course => course.id === this.activatedRoute.snapshot.paramMap.get('id'));
        if (foundCourse) {
          console.log(foundCourse);
          this.courseForm.get('title').patchValue(foundCourse.title);
          this.courseForm.get('description').patchValue(foundCourse.description);
          this.courseForm.get('duration').patchValue(foundCourse.duration);
          const authorsArrayForm: FormArray = this.courseForm.get('newAuthor').get('authors') as FormArray;
          foundCourse.authors.forEach(authorName => {
            authorsArrayForm.push(this.formBuilder.control(authorName, []));
          });
        }
      })
    }
    
    
  }

  processSubmit(): void {
    this.formSubmitted = true;
    if (this.courseForm.valid && !this.activatedRoute.snapshot.paramMap.get('id')) {
      const authorsNames: string[] = this.courseForm.get('newAuthor').get('authors').value;
      this.authorsStorageService.authors$
      .pipe(first())
      .subscribe(authors => {
        const createdAuthors: Author[] = [];
        authorsNames.forEach(authorName => createdAuthors.push(authors.find(author => author.name === authorName)));
        const requestBody: Course = {
          title: this.courseForm.get('title').value,
          description: this.courseForm.get('description').value,
          authors: createdAuthors.map(author => author.id),
          duration: this.courseForm.get('duration').value
        };
        this.coursesStorageSerivce.createCourse(requestBody);
        this.router.navigateByUrl('/courses');
      })
    } else if (this.courseForm.valid && this.activatedRoute.snapshot.paramMap.get('id')) {
      const authorsNames: string[] = this.courseForm.get('newAuthor').get('authors').value;
      this.authorsStorageService.authors$
      .pipe(first())
      .subscribe(authors => {
        const createdAuthors: Author[] = [];
        authorsNames.forEach(authorName => createdAuthors.push(authors.find(author => author.name === authorName)));
        const requestBody: Course = {
          id: this.activatedRoute.snapshot.paramMap.get('id'),
          title: this.courseForm.get('title').value,
          description: this.courseForm.get('description').value,
          authors: createdAuthors.map(author => author.id),
          duration: this.courseForm.get('duration').value
        };
        this.coursesStorageSerivce.editCourse(requestBody);
        this.router.navigateByUrl('/courses');
      })
    }
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
      this.authorsStorageService.addAuthor({name: authorName});
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

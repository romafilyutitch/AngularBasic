import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Author } from 'src/app/services/author.model';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;
  formSubmitted: boolean;
  courseToEdit: Course;
  isLoading: boolean = false;
  
  isLoadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private coursesStorageSerivce: CoursesStoreService, 
              private authorsStorageService: AuthorsStoreService,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorsStorageService.getAll();
    this.buildForm();
    if(this.shouldFormEditCourse()) {
      this.subscribeToCourseToEdit();
      this.updateFormToEditCourse(this.courseToEdit);
    }
    this.subscribeToIsLoading();
  }

  ngOnDestroy(): void {
      this.isLoadingSubscription.unsubscribe();
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

  processSubmit(): void {
    this.formSubmitted = true;
    if (this.courseForm.valid) {
        const requestBody: Course = this.buildRequestBody();
        if(this.shouldFormEditCourse()) {
          this.coursesStorageSerivce.editCourse(requestBody);
        } else {
          this.coursesStorageSerivce.createCourse(requestBody);
        }
        this.router.navigateByUrl('/courses');
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
    }
  }

  removeAuthor(removeIndex: number): void {
    const newAuthorsFormArray: FormArray = this.courseForm.get('newAuthor').get('authors') as FormArray;
    newAuthorsFormArray.removeAt(removeIndex);
  }

  private subscribeToIsLoading(): void {
    this.isLoadingSubscription = this.coursesStorageSerivce.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }


  private subscribeToCourseToEdit(): void {
    const courseToEditId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.coursesStorageSerivce.getCourse(courseToEditId);
    this.coursesStorageSerivce.courses$
    .pipe(first())
    .subscribe(courses => {
      this.courseToEdit = courses.find(course => course.id === courseToEditId);
    });
  }

  private updateFormToEditCourse(course: Course): void {
    this.courseForm.get('title').patchValue(course.title);
    this.courseForm.get('description').patchValue(course.description);
    this.courseForm.get('duration').patchValue(course.duration);
    const authorsArrayForm: FormArray = this.courseForm.get('newAuthor').get('authors') as FormArray;
    course.authors.forEach(authorName => {
      authorsArrayForm.push(this.formBuilder.control(authorName, []));
    });
  }

  private shouldFormEditCourse(): boolean {
    const editedCoruseId: string = this.activatedRoute.snapshot.paramMap.get('id');
    return editedCoruseId ? true : false;
  }

  private buildForm(): void {
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

  private buildRequestBody(): Course {
    const authorsNames: string[] = this.courseForm.get('newAuthor').get('authors').value;
    const requestBody: Course = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      title: this.courseForm.get('title').value,
      description: this.courseForm.get('description').value,
      authors: authorsNames,
      duration: this.courseForm.get('duration').value
    };
    return requestBody;
  } 
}

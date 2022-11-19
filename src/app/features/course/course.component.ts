import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from 'src/app/services/course.model';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
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

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorsStateFacade.getAuthors();
    this.buildForm();
    if (this.shouldFormEditCourse()) {
      this.subscribeToCourseToEdit();
      const courseToEditId: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.coursesStateFacade.getSingleCourse(courseToEditId);
    }
    this.subscribeToIsLoading();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  processSubmit(): void {
    this.formSubmitted = true;
    if (this.courseForm.valid) {
      const requestBody: Course = this.buildRequestBody();
      if (this.shouldFormEditCourse()) {
        this.coursesStateFacade.editCourse(requestBody);
      } else {
        this.coursesStateFacade.createCourse(requestBody);
      }
      this.router.navigateByUrl('/courses');
    }
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

  createAuthor(): void {
    const authorNameControl: FormControl = this.courseForm.get('newAuthor').get('authorName') as FormControl;
    const authorName: string = authorNameControl.value;
    if (authorName && authorNameControl.valid) {
      const newAuthorsFormArray: FormArray = this.courseForm.get('newAuthor').get('authors') as FormArray;
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
    this.coursesStateFacade.isSingleCourseLoading$.pipe(takeUntil(this.destroyed$)).subscribe(isLoading => this.isLoading = isLoading);
  }

  private subscribeToCourseToEdit(): void {
    this.coursesStateFacade.course$.pipe(takeUntil(this.destroyed$)).subscribe(courseToEdit => {
      this.courseToEdit = courseToEdit;
      this.updateFormToEditCourse(this.courseToEdit);
    });
  }

  private updateFormToEditCourse(course: Course): void {
    this.courseForm.get('title').patchValue(course.title);
    this.courseForm.get('description').patchValue(course.description);
    this.courseForm.get('duration').patchValue(course.duration);
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

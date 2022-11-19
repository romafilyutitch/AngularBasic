import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Subject, Subscription, take, takeUntil } from 'rxjs';
import { requestLoginSuccess } from 'src/app/auth/store/auth.actions';
import { Course } from 'src/app/services/course.model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  allCourses: Course[];
  filteredCourses: Course[];
  isUserAdmin: boolean;
  isAllCoursesLoading: boolean = false;
  isSearchingState: boolean = false;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private courseStateFacade: CoursesStateFacade,
    private authorsStteFacade: AuthorsStateFacade,
    private usersStateFacade: UserStateFacade,
    private router: Router) { }

  ngOnInit(): void {
    this.authorsStteFacade.getAuthors();
    this.courseStateFacade.getAllCourses();
    this.subscribeToCourses();
    this.subscribeToFilteredCourses();
    this.subscribeToIsAdmin();
    this.subscribeToIsAllCoursesLoading();
    this.subscribeToIsSearchingState();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  searchCourse(title: string): void {
    if (title) {
      this.courseStateFacade.getFilteredCourses(title);
    } else {
      this.courseStateFacade.getAllCourses();
    }
  }

  removeCourse(courseToRemove: Course): void {
    this.courseStateFacade.deleteCourse(courseToRemove);
  }

  redirectToEditCoursePage(courseToEdit: Course): void {
    this.router.navigate(['/', 'courses', 'edit', courseToEdit.id]);
  }

  redirectToShowCoursePage(courseToShow: Course): void {
    this.router.navigate(['/', 'courses', courseToShow.id]);
  }

  private subscribeToCourses(): void {
    this.courseStateFacade.allCourses$.pipe(takeUntil(this.destroyed$)).subscribe(allCourses => {this.allCourses = allCourses})}

  private subscribeToFilteredCourses(): void {
    this.courseStateFacade.courses$.pipe(takeUntil(this.destroyed$)).subscribe(filteredCourses => {this.allCourses = filteredCourses});
  }

  private subscribeToIsAdmin(): void {
    this.usersStateFacade.isAdmin$.pipe(takeUntil(this.destroyed$)).subscribe(isAdmin => this.isUserAdmin = isAdmin);
  }

  private subscribeToIsAllCoursesLoading(): void {
    this.courseStateFacade.isAllCoursesLoading$.pipe(takeUntil(this.destroyed$)).subscribe(isAllCoursesLoading => this.isAllCoursesLoading = isAllCoursesLoading)
  }

  private subscribeToIsSearchingState(): void {
    this.courseStateFacade.isSearchingState$.pipe(takeUntil(this.destroyed$)).subscribe(isSearchingState => this.isSearchingState = isSearchingState);
  }
}

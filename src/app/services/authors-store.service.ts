import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService implements OnDestroy {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private authorsService: AuthorsService) { }

  ngOnDestroy(): void {
      this.isLoading$$.complete();
      this.authors$$.complete();
  }

  getAll() {
    this.isLoading$$.next(true);
    return this.authorsService.getAll().subscribe(authors => {
      this.isLoading$$.next(false);
      this.authors$$.next(authors);
    })
  }

  addAuthor(author: Author) {
    this.isLoading$$.next(true);
    this.authorsService.addAuthor(author)
    .pipe(switchMap(() => this.authorsService.getAll()))
    .subscribe(authors => {
      this.isLoading$$.next(false);
      this.authors$$.next(authors);
    });
  }
}

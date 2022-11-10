import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService implements OnInit, OnDestroy {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject([]);

  public isLoading$: Observable<boolean>;
  public authors$: Observable<Author[]>;

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
      this.isLoading$ = this.isLoading$$.asObservable();
      this.authors$ = this.authors$$.asObservable();
  }

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
    this.authorsService.addAuthor(author).subscribe(() => {
      this.isLoading$$.next(false);
    })
  }
}

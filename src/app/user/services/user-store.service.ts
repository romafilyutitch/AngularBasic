import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService implements OnInit, OnDestroy{

  private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public name$: Observable<string>;
  public isAdmin$: Observable<boolean>;

  constructor(private userSerice: UserService) { }

  ngOnInit(): void {
      this.name$ = this.name$$.asObservable();
      this.isAdmin$ = this.isAdmin$$.asObservable();
  }

  ngOnDestroy(): void {
      this.name$$.complete();
      this.isAdmin$$.complete();
  }

  getUser() {
    this.userSerice.getUser().subscribe(user => {
      this.name$$.next(user.name);
      this.isAdmin$$.next(user.role === 'admin');
    })
  }
}

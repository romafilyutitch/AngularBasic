import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService implements OnDestroy {

  private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public name$: Observable<string> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userSerice: UserService) { }

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

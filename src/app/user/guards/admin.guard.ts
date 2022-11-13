import { Injectable,  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  
  constructor(private userStoreService: UserStoreService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userStoreService.isAdmin$.pipe(
        map(isAdmin => {
          return isAdmin ? true : this.router.parseUrl('/courses');
        })
      )
  }
  
}

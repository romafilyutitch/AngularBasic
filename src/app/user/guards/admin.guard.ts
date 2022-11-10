import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit{
  
  private isUserAdmin: boolean;
  
  constructor(private userStoreService: UserStoreService, private router: Router) {
  }

  ngOnInit(): void {
      this.userStoreService.getUser();
      this.userStoreService.isAdmin$.subscribe(isAdmin => this.isUserAdmin = isAdmin);
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isUserAdmin ? true: this.router.navigateByUrl('/courses')
  }
  
}

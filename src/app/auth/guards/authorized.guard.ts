import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate, OnInit {

  private isAuthorized: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.isAuthorized$.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isAuthorized ? true : this.router.parseUrl('/login');
  }
  
}

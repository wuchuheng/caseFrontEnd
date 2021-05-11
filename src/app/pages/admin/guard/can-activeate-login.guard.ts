import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {isValidToken} from '../../../utils/auth';

@Injectable({
  providedIn: 'root'
})
export class CanActiveateLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url)

    // if (this.router.url === '/login' && isValidToken()) {
    //   return this.router.parseUrl('/admin/home')
    // }
    if (isValidToken()) {
      return true;
    } else {
      const urlTree = this.router.parseUrl('/admin/login')
      return urlTree
    }
  }
}

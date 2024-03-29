import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {

    const token = this.localStorageToken.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}

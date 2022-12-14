import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginService} from "../service/login.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (!this.loginService.isLoggedIn) {
    //   this.router.navigate(['login']);
    //   return false;
    // } else {
    //   return true;
    // }
    if (!this.loginService.isLoggedIn.valueOf()) {
      this.router.navigate(['/login']);
    }
    return this.loginService.isLoggedIn;
  }

}

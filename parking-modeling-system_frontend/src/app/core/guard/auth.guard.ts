import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.loginService.isLoggedIn.valueOf()) {
      this.router.navigate(['/auth']);
    }
    return true;
  }

}

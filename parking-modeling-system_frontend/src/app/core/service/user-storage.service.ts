import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  public role: string = "";
  constructor(public authService:AuthService) { }

  signOut() {
    this.authService.isLoggedIn = false;
    window.sessionStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string) {
    console.log(authorities);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }


  public getAuthorities(): string {
    this.role = "";

    if (sessionStorage.getItem(TOKEN_KEY)) {

      this.role = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!);
    }

    return this.role;
  }
}

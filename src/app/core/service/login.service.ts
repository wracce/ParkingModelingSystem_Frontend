import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../model/model";
import {Observable} from "rxjs";
import {JwtResponse} from "../auth-model/jwt-response";


@Injectable()
export class LoginService {
  private loginUrl = environment.apiBaseUrl + '/auth/login';
  private registerUrl = environment.apiBaseUrl + '/auth/register';
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  auth(userInfo: UserInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userInfo);
  }

  register(userInfo: UserInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, userInfo);
  }
}

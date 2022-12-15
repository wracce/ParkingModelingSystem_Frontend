import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfo} from "../model/model";
import {UserStorageService} from "./user-storage.service";

@Injectable()
export class ManagerService {
  private apiUrl = environment.apiBaseUrl + "/manager";

  constructor(
    private http: HttpClient,
    private userStorage: UserStorageService) {}

  public getAll(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.apiUrl, {
      headers: new HttpHeaders({
        authtoken: this.userStorage.getToken(),
      })
    });
  }

  public createManager(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.apiUrl, userInfo, {
      headers: new HttpHeaders({
        authtoken: this.userStorage.getToken(),
      })
    });
  }

  public updateManager(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>(this.apiUrl + '/' + userInfo.id, userInfo, {
      headers: new HttpHeaders({
        authtoken: this.userStorage.getToken(),
      })
    });
  }

  public deleteManager(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, {
      headers: new HttpHeaders({
        authtoken: this.userStorage.getToken(),
      })
    });
  }


}

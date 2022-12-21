import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "../model/model";

@Injectable()
export class DataShareService {
  private userInfo = new BehaviorSubject<any>({});

  currentUser = this.userInfo.asObservable();

  constructor() {
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }
}


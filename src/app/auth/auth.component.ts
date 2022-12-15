import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup} from "@angular/forms";
import {UserInfo} from "../core/model/model";
import {AuthService} from "../core/service/auth.service";
import {UserStorageService} from "../core/service/user-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;

  form: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  userInfo: UserInfo;

  constructor(
    private authService: AuthService,
    private userStorage: UserStorageService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.userInfo = {} as UserInfo;
  }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.userInfo.username = this.form.controls["login"].value;
    this.userInfo.password = this.form.controls["password"].value;
    this.authService.auth(this.userInfo).subscribe(r => {
      // alert(r.token + "\n" + r.username + "\n" + r.userRole)
      if (r.token && r.username && r.userRole) {
        this.userStorage.saveToken(r.token);
        this.userStorage.saveUsername(r.username);
        this.userStorage.saveAuthorities(r.userRole);
        this.userInfo.userRole = r.userRole;
        this.auth();
      }
    }, error => {
      this.snackBar.open('Вход запрещен: неверные учетные данные', '❌', {
          duration: 5000,
        });
    });
  }

  auth() {
    this.authService.isLoggedIn = true;
    if (this.userInfo.userRole === "[ROLE_ADMINISTRATOR]") {
      this.router.navigate(['/administrator']);
    } else {
      this.router.navigate(['/manager']);
    }
  }

  onClicked() {
    alert();
  }
}

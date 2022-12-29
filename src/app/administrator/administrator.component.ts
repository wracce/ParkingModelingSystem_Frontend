import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigurateUserComponent } from './dialog-configurate-user/dialog-configurate-user.component';
import { UserInfo } from '../core/model/model';
import { UserService } from '../core/service/user.service';
import { DataShareService } from '../core/service/data-share.service';
import { AdministratorService } from './services/administrator.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  fio: string;
  login: string;
  usersList: UserInfo[];
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dataShareService: DataShareService,
    public administratorService: AdministratorService,
    private snackBar: MatSnackBar,
  ) {
    this.userService.getAll().subscribe((r: UserInfo[]) => {
      this.usersList = r;
    });

    this.dataShareService.currentUser.subscribe(r => {
      this.userService.getByUsername(r).subscribe(r2 => {
        this.fio = r2.fio;
        this.login = r2.username;
      })
    });
  }

  ngOnInit(): void {}

  addManager() {
    // Очистим форму
    this.administratorService.settingsUserForm.setValue({
      login: '',
      password: '',
      fio: '',
    });

    // передадим в диалоговое окно "add" чтобы показать окно добавления
    const dialogRef = this.dialog.open(DialogConfigurateUserComponent, {
      data: 'add',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        let userInfo = {} as UserInfo;
        // форма будет теперь храниться в сервисе, чтобы не передавать через Input Output в компонент
        userInfo.username = this.administratorService.settingsUserForm.value['login'];
        userInfo.password = this.administratorService.settingsUserForm.value['password'];
        userInfo.fio = this.administratorService.settingsUserForm.value['fio'];
        this.userService.createManager(userInfo).subscribe((r: UserInfo) => {
          this.usersList.push(r);
          this.snackBar.open("Добавление нового менеджера [" + userInfo.fio + "] заверешно успешно", '✔️', {
            duration: 5000,
          });
        });
      }
    });
  }
  editManager(user: UserInfo) {
        this.administratorService.settingsUserForm.setValue({
          login: user.username,
          password: '',
          fio: user.fio,
        });

        const dialogRef = this.dialog.open(DialogConfigurateUserComponent, {
          data: 'edit',
        });
        let userInfo = {} as UserInfo;
        dialogRef.afterClosed().subscribe((data) => {
          if (data === true) {
            userInfo.id = user.id;
            userInfo.role = "ROLE_MANAGER";
            userInfo.username = this.administratorService.settingsUserForm.value['login'];
            userInfo.password = this.administratorService.settingsUserForm.value['password'];
            userInfo.fio = this.administratorService.settingsUserForm.value['fio'];
            this.userService.updateManager(userInfo).subscribe(r => {
              let index = this.usersList.findIndex(x => x.id == r.id);
              this.usersList[index] = r;
              this.snackBar.open("Редактирование данных менеджера [" + userInfo.fio + "] заверешно успешно", '✔️', {
                duration: 5000,
              });
            });
          }
        });
  }
  deleteManager(user: UserInfo) {
    this.userService.deleteManager(user.id).subscribe(r => {
      this.usersList.splice(this.usersList.findIndex(x => x.id == user.id), 1);
      this.snackBar.open('Удаление пользователя [' + user.fio + '] завершено успешно', '✔️', {
        duration: 5000,
      });
    });
  }
}

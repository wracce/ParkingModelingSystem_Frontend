import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigurateUserComponent } from './dialog-configurate-user/dialog-configurate-user.component';
import { UserInfo } from '../core/model/model';
import { ManagerService } from '../core/service/manager.service';
import { DataShareService } from '../core/service/data-share.service';
import { AdministratorService } from './services/administrator.service';

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
    private managerService: ManagerService,
    private dataShareService: DataShareService,
    public administratorService: AdministratorService
  ) {
    this.managerService.getAll().subscribe((r: UserInfo[]) => {
      this.usersList = r;
    });
    //this.fio = sessionStorage.getItem("")
    this.dataShareService.currentUser.subscribe((val) => {
      this.fio = val.fio;
      this.login = val.username;
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
        this.managerService.createManager(userInfo).subscribe((r: UserInfo) => {
          this.usersList.push(r);
        });
      }
    });
  }
  editManager(id: number) {
        let userInfo = {} as UserInfo; // TODO: БЭК: getUser(id):UserInfo; Надо получить объект  по ID 

        this.administratorService.settingsUserForm.setValue({
          login: userInfo.username,
          password: userInfo.password,
          fio: userInfo.fio,
        });
        
        const dialogRef = this.dialog.open(DialogConfigurateUserComponent, {
          data: 'edit',
        });
    
        dialogRef.afterClosed().subscribe((data) => {
          if (data === true) {
            userInfo.username = this.administratorService.settingsUserForm.value['login'];
            userInfo.password = this.administratorService.settingsUserForm.value['password'];
            userInfo.fio = this.administratorService.settingsUserForm.value['fio'];
            // TODO: БЭК: Изменить пользователя на сервере
            // this.managerService.createManager(userInfo).subscribe((r: UserInfo) => {
            //   this.usersList.push(r);
            // });
          }
        });
  }
  deleteManager(id: number) {
    let userInfo = {} as UserInfo; // TODO: БЭК: getUser(id):UserInfo; Надо получить объект  по ID 

    // TODO: ФРОНТ: добавить ФИО/Логин удаляемого пользователя в диалоговое окно
    this.administratorService.settingsUserForm.setValue({
      login: userInfo.username,
      password: userInfo.password,
      fio: userInfo.fio,
    });
    
    const dialogRef = this.dialog.open(DialogConfigurateUserComponent, {
      data: 'delete',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        // TODO: БЭК: Удалить пользователя на сервере
        // this.managerService.createManager(userInfo).subscribe((r: UserInfo) => {
        //   this.usersList.push(r);
        // });
      }
    });
  }
}

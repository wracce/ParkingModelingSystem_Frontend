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
    public administratorService:AdministratorService
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
    const dialogRef = this.dialog.open(DialogConfigurateUserComponent,{data: "edit"});

    dialogRef.afterClosed().subscribe((data) => {
      // если нажата кнопка принять
      if (data === true) {
        let userInfo = {} as UserInfo;
        // Очистим форму
        this.administratorService.settingsUserForm.setValue({login: '', password: '', fio: ''});
        // форма будет теперь храниться в сервисе, чтобы не передавать через Input Output
        userInfo.username = this.administratorService.settingsUserForm.controls['login'].value;
        userInfo.password = this.administratorService.settingsUserForm.controls['password'].value;
        userInfo.fio = this.administratorService.settingsUserForm.controls['fio'].value;
        this.managerService.createManager(userInfo).subscribe((r: UserInfo) => {
          this.usersList.push(r);
        });
      }
    });
  }
  editManager(id: number) {}
  deleteManager(id: number) {}
}

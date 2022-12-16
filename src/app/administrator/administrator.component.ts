import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigurateUserComponent } from './dialog-configurate-user/dialog-configurate-user.component';
import {UserInfo} from "../core/model/model";
import {ManagerService} from "../core/service/manager.service";
import {DataShareService} from "../core/service/data-share.service";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  settingsUserForm!: FormGroup;
  fio: string;
  login: string;
  usersList: UserInfo[];
  constructor(
    public dialog: MatDialog,
    private managerService: ManagerService,
    private dataShareService: DataShareService) {

    this.managerService.getAll().subscribe(
      (r: UserInfo[]) => {
        this.usersList = r;
      });
    //this.fio = sessionStorage.getItem("")
    this.dataShareService.currentUser.subscribe((val) => {
      this.fio = val.fio;
      this.login = val.username;
    });

    // this.usersList = [
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    //   'Иванов Иван Иванович',
    // ];
  }

  ngOnInit(): void {}

  addManager() {
    const dialogRef = this.dialog.open(DialogConfigurateUserComponent);

    dialogRef.afterClosed().subscribe(data => {
      let userInfo = {} as UserInfo;
      userInfo.username = data.controls['login'].value;
      userInfo.password = data.controls['password'].value;
      userInfo.fio = data.controls['fio'].value;
      this.managerService.createManager(userInfo).subscribe((r: UserInfo) => {
        this.usersList.push(r);
      });
    });
  }
  editManager(id: number) {}
  deleteManager(id: number) {}
}


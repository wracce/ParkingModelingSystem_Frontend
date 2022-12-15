import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigurateUserComponent } from './dialog-configurate-user/dialog-configurate-user.component';
import {UserInfo} from "../core/model/model";
import {ManagerService} from "../core/service/manager.service";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  settingsUserForm!: FormGroup;

  usersList: UserInfo[];
  constructor(
    public dialog: MatDialog,
    private managerService: ManagerService) {
    this.settingsUserForm = new FormGroup({
      fio: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
    });
    this.managerService.getAll().subscribe(
      (r: UserInfo[]) => {
        this.usersList = r;
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
      console.log(`fio: ${data.controls['fio'].value}`,`login: ${data.controls['login'].value}`,`password: ${data.controls['password'].value}`);
    });
  }
  editManager(id: number) {}
  deleteManager(id: number) {}
}


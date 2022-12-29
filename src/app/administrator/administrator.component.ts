import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigurateUserComponent } from './dialog-configurate-user/dialog-configurate-user.component';
import { UserInfo } from '../core/model/model';
import { UserService } from '../core/service/user.service';
import { DataShareService } from '../core/service/data-share.service';
import { AdministratorService } from './services/administrator.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { DesignerService } from '../designer/services/designer.service';
import { ParkingFileManager } from '../designer/models/parking-file-manager';
import { Validator } from '../simulation/validation/validator';
import { ParkingMap } from '../designer/models/parking-map';
import { ValidatorDialogComponent } from '../simulation/validation/validator-dialog/validator-dialog.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  @ViewChild('fileInput2')
  fileInput!: ElementRef;
  fio: string;
  login: string;
  file: File | null = null;
  usersList: UserInfo[];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dataShareService: DataShareService,
    public administratorService: AdministratorService,
    private snackBar: MatSnackBar,
    private router:Router,
    public designerService:DesignerService
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

  createParkingMap():void{
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    let pDialog = this.dialog;
    let pRouter = this.router;
    let pDesignerService = this.designerService;
    let fileReader = new FileReader();
    fileReader.onload = function () {
      let map = new ParkingMap();
      let validator = new Validator(map);
      if (ParkingFileManager.loadFromFileReader(this, map)) {
        if (validator.validate()) {
          pDesignerService.getParkingMap().from(map);
          pRouter.navigate(['/administrator/designer']);
          return;
        } else{
          pDialog.open(ValidatorDialogComponent,{data:{message: ["Неверная топология"]}})
        }
      } else {
        pDialog.open(ValidatorDialogComponent,{data:{message: ["Файл не распознан"]}})
      }
    };
    fileReader.readAsText(this.file);
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }
}

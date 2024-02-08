import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DesignerService } from 'src/app/designer/services/designer.service';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { AdministratorService } from '../services/administrator.service';
import {UserInfo} from "../../core/model/model";

@Component({
  selector: 'app-dialog-configurate-user',
  templateUrl: './dialog-configurate-user.component.html',
  styleUrls: ['./dialog-configurate-user.component.scss']
})
export class DialogConfigurateUserComponent {
  settingsUserForm!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, administratorService:AdministratorService) {
    this.settingsUserForm = administratorService.settingsUserForm;
  }

  istoMinMax(): boolean {
    return !(this.settingsUserForm.value["password"].length >= 4 || this.settingsUserForm.value["password"].length == 0);
  }
}

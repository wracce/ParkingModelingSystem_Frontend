import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-configurate-user',
  templateUrl: './dialog-configurate-user.component.html',
  styleUrls: ['./dialog-configurate-user.component.scss']
})
export class DialogConfigurateUserComponent {
  settingsUserForm!:FormGroup;
  constructor(){
    this.settingsUserForm = new FormGroup({
      fio: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
    });
  }
}

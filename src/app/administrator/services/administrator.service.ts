import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  settingsUserForm!:FormGroup;
  constructor() {
    this.settingsUserForm = new FormGroup({
      fio: new FormControl("",[Validators.required,Validators.maxLength(128)]),
      login: new FormControl("",[Validators.required, Validators.minLength(2),Validators.maxLength(8)]),
      password: new FormControl(),
    });
  }
}

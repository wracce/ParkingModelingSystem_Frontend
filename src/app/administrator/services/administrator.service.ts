import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  settingsUserForm!:FormGroup;
  constructor() {
    this.settingsUserForm = new FormGroup({
      fio: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
    });
  }
}

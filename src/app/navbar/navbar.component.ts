import { Component, Input, OnInit } from '@angular/core';
import {UserStorageService} from "../core/service/user-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() view: string ="";
  state = "Выйти";
  constructor(
    private userStorageService: UserStorageService) { }

  ngOnInit(): void {
  }


  setView(view:string): void {
    this.view = view;
  }

  sign() {
    if (this.userStorageService.getToken() !== null) {
    } else {
      this.userStorageService.signOut();
      this.state = "Войти";
    }
  }
}


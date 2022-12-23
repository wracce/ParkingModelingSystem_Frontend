import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceComponent } from '../reference/reference.component';
import {UserStorageService} from "../core/service/user-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() view: string ="";

  state = "Выйти";
  constructor(public dialog: MatDialog,
    private userStorageService: UserStorageService) { }

  ngOnInit(): void {
  }


  setView(view:string): void {
    this.view = view;
  }

  openDialogReference() {
    const dialogRef = this.dialog.open(ReferenceComponent);
  }

  sign() {
    if (this.userStorageService.getToken() !== null) {
    } else {
      this.userStorageService.signOut();
      this.state = "Войти";
    }

  }
}


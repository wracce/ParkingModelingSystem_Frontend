import {Component, Injectable, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceComponent } from '../reference/reference.component';
import {UserStorageService} from "../core/service/user-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {

  @Input() view: string ="";
  public adminBtn: boolean = false;
  public managerBtn: boolean = false;


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


}


import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceComponent } from '../reference/reference.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() view: string ="";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  setView(view:string): void {
    this.view = view;
  }

  openDialogReference() {
    const dialogRef = this.dialog.open(ReferenceComponent);
  }
}


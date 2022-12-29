import {Component, Injectable, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceComponent } from '../reference/reference.component';
import {UserStorageService} from "../core/service/user-storage.service";
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private userStorageService: UserStorageService, public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  openDialogReference() {
    const dialogRef = this.dialog.open(ReferenceComponent);
  }

  public linkToHome():string {
    let link="/auth";
    
    let role = this.userStorageService.getAuthorities();
    console.log(role);

    if(role.localeCompare("ROLE_ADMINISTRATOR"))
      link = "/administrator";
    if(role.localeCompare("ROLE_MANAGER"))
      link = "/manager";
    return link;
  }

  public authInOut():void {
    if (this.authService.isLoggedIn){
      this.userStorageService.signOut();
    }
      // this.router.navigate(['/auth']);
    }

}


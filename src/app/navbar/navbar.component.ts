import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReferenceComponent } from '../reference/reference.component';
import { UserStorageService } from '../core/service/user-storage.service';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';
import { DataShareService } from '../core/service/data-share.service';
import { UserService } from '../core/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private userStorageService: UserStorageService,
    public authService: AuthService,
    private router: Router,
    private  dataShareService:DataShareService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  openDialogReference() {
    const dialogRef = this.dialog.open(ReferenceComponent);
  }

  public routeToHome(): void {

    let role:string;
    this.dataShareService.currentUser.subscribe(val=> {
      this.userService.getByUsername(val).subscribe(val2 => {
        if (val2.userRole.localeCompare('ROLE_ADMINISTRATOR')) this.router.navigate(['/administrator']);
        else if (val2.userRole.localeCompare('ROLE_MANAGER')) this.router.navigate(['/manager']);
        else this.router.navigate(['/manager']);
      });
    });

  }

  public authInOut(): void {
    if (this.authService.isLoggedIn) {
      this.userStorageService.signOut();
    }
  }
}

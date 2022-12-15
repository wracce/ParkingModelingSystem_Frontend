import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DesignerService } from 'src/app/designer/services/designer.service';

@Component({
  selector: 'app-dialog-configurate-user',
  templateUrl: './dialog-configurate-user.component.html',
  styleUrls: ['./dialog-configurate-user.component.scss']
})
export class DialogConfigurateUserComponent {
  settingsUserForm!:FormGroup;
}

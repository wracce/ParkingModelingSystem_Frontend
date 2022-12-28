import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-validator-dialog',
  templateUrl: './validator-dialog.component.html',
  styleUrls: ['./validator-dialog.component.scss']
})
export class ValidatorDialogComponent {

  message: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      message: string[];
    },
    private dialogRef: MatDialogRef<ValidatorDialogComponent>
  ) {
    if (data?.message) this.message = data.message;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

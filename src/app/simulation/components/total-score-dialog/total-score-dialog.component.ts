import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-total-score-dialog',
  templateUrl: './total-score-dialog.component.html',
  styleUrls: ['./total-score-dialog.component.scss']
})
export class TotalScoreDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      minCost: number,
      maxCost: number,
      avgCost: number,
      totalCost: number,
      minTime: number,
      maxTime: number,
      avgTime: number,
      totalTime: number,
      delta: number,
    },
    private dialogRef: MatDialogRef<TotalScoreDialogComponent>
  ) {
    if (isNaN(data.avgTime)) {
      data.minCost = 0;
      data.maxCost = 0;
      data.avgCost = 0;
      data.totalCost = 0;
      data.minTime = 0;
      data.maxTime = 0;
      data.avgTime = 0;
      data.totalTime = 0;
    }
  }
}

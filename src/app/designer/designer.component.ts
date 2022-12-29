import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { observable } from 'rxjs';
import { DesignerParkingComponent } from './components/designer-parking/designer-parking.component';
import { DesignerService } from './services/designer.service';
import { Validator } from '../simulation/validation/validator';
import { MatDialog } from '@angular/material/dialog';
import { ParkingMeter } from '../simulation/models/ParkingSystem/parkingMeter';
import { ValidatorDialogComponent } from '../simulation/validation/validator-dialog/validator-dialog.component';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit {
  @ViewChild(DesignerParkingComponent)
  public designerParkingComponent!: DesignerParkingComponent;
  @ViewChild('stepper', { static: false })
  public stepper!: MatStepper;


  constructor(
    public designerService: DesignerService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.stepper.selectionChange.unsubscribe();
    // this.stepper.selectionChange.pipe ((value:StepperSelectionEvent) => console.log(2));
    // this.stepper.selectionChange.subscribe((value:StepperSelectionEvent) => console.log(2));
  }

  public selectionChange(event: StepperSelectionEvent): void {
    console.log(event);

    if (event.previouslySelectedIndex === (0 && 1)) {
      this.designerService
        .getParkingMap()
        .configurateParking(this.designerService.getSetupParkingForm());
      this.designerService.resetLinksToParkingCells();
      this.designerParkingComponent.zoomFree();
    }
    if (event.previouslySelectedIndex === 1 && event.selectedIndex === 2) {
      let validator: Validator = new Validator(
        this.designerService.getParkingMap(),this.matDialog
      );
      if (!validator.validate()) {
        setTimeout(() => this.stepper.previous(), 0);
        this.matDialog.open(ValidatorDialogComponent, {data:{message: [validator.message]}});
      }
    }
  }
}

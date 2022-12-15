import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DesignerParkingComponent } from '../designer/components/designer-parking/designer-parking.component';
import { DesignerService } from '../designer/services/designer.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  selectedId: number = 0;

  
  constructor(public designerService:DesignerService){}

  public selectionChange(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex === (0 &&1)) {

      //this.designerService.getParkingMap().configurateParking(this.designerService.getSetupParkingForm());
      //this.designerService.resetLinksToParkingCells();
      //this.designerParkingComponent.zoomFree();
      
    }
      if (event.previouslySelectedIndex === 1 && event.selectedIndex === 2) {
      //this.onClickFileInputButton();
    }
  }

  ngOnInit(){}
}
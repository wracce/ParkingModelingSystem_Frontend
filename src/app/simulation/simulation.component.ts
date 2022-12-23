import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DesignerParkingComponent } from '../designer/components/designer-parking/designer-parking.component';
import { DesignerService } from '../designer/services/designer.service';
import { SimulationProcessViewComponent } from './components/simulation-process-view/simulation-process-view.component';
import { DeterminateDistribution } from './models/distributions/determinate-distribution';
import { SimulationService } from './services/simulation.service';
import {ParkingState} from "../designer/models/parking-state";
import {ParkingTemplate} from "../designer/models/parking-template";

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  @ViewChild(SimulationProcessViewComponent)
  public simulationProcessComponent!: SimulationProcessViewComponent;

  selectedId: number = 0;
  parkingPlacesCar: number = 0;
  parkingPlacesTruck: number = 0;


  displayedColumns = ['position', 'timeIn', 'timeOut', 'cost'];
  dataSource = ELEMENT_DATA;
  constructor(public simulationService:SimulationService) {
    this.simulationService.simulationMap.parkingMeter.parkingPlaces.forEach((val) => {
        if (val.parkingCell.template.name === "Парковочное место 1x1") this.parkingPlacesCar++;
        else if (val.parkingCell.template.name === "Парковочное место 1x2") this.parkingPlacesTruck++;
        else if (val.parkingCell.template.name === "Парковочное место 2x1") this.parkingPlacesTruck++;
    })
    // this.parkingPlaces = this.simulationService.simulationMap.parkingMeter.parkingPlaces.filter((val) =>
    // val.parkingCell.template.name === "");
  }

  public selectionChange(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex === (0 &&1)) {

      //this.designerService.getParkingMap().configurateParking(this.designerService.getSetupParkingForm());
      //this.designerService.resetLinksToParkingCells();
      this.simulationProcessComponent.zoomFree();

    }
      if (event.previouslySelectedIndex === 1 && event.selectedIndex === 2) {
      //this.onClickFileInputButton();
    }
  }

  ngOnInit(){}

  public startSimulation() {
    this.simulationService.simulationEngine.init(1000, new DeterminateDistribution(4000), new DeterminateDistribution(2000));
    this.simulationService.simulationEngine.run();
  }

  public pauseSimulation() {

  }

  public stopSimulation() {
    this.simulationService.simulationEngine.stop();
  }

}

export const ELEMENT_DATA: Object[] = [
  {position: 1, timeIn: '12:00', timeOut: '12:05', cost: 2500},

]

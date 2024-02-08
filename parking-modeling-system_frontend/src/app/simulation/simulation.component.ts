import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DesignerParkingComponent } from '../designer/components/designer-parking/designer-parking.component';
import { DesignerService } from '../designer/services/designer.service';
import { SimulationProcessViewComponent } from './components/simulation-process-view/simulation-process-view.component';
import { DeterminateDistribution } from './models/distributions/determinate-distribution';
import { SimulationService } from './services/simulation.service';
import {ParkingState} from "../designer/models/parking-state";
import {ParkingTemplate} from "../designer/models/parking-template";
import {TableRow} from "./models/table-row";
import {Subscription} from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import {Validator} from "./validation/validator";
import {ValidatorDialogComponent} from "./validation/validator-dialog/validator-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent implements OnInit {
  @ViewChild(SimulationProcessViewComponent)
  public simulationProcessComponent!: SimulationProcessViewComponent;
  public selectedId =0;

  public displayedColumns = ['position', 'timeIn', 'parkingTime', 'cost'];
  public dataSource:TableRow[];

  constructor(
    public simulationService:SimulationService,
    public matDialog: MatDialog) {
    this.dataSource = [];

  }

  public selectionChange(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex === (0 && 1)) {
      this.simulationService.configurateSimulation();
      this.simulationProcessComponent.zoomFree();
    }
    if (event.previouslySelectedIndex === 1 && event.selectedIndex === 2) {

      //this.onClickFileInputButton();
    }
  }

  ngOnInit() {
    setInterval(()=>this.simulationService.getParkingTable().subscribe(value => {
      this.dataSource = [...value];
    }),1000);
  }

  public startSimulation() {

    if (!this.simulationService.simulationEngine.isRun){
      let form = this.simulationService.setupSimulationForm;
      let traficDistribution = form.value['traficDistribution'];
      let parkingDistribution = form.value['parkingDistribution'];
      let enterChance = form.value['enterChance'];
      let truckChance = form.value['truckChance'];
      let dayCost = form.value['dayCost'];
      let nightCost = form.value['nightCost'];

      this.simulationService.simulationEngine.init(
        traficDistribution,
        parkingDistribution,
        enterChance,
        truckChance,
        dayCost,
        nightCost
      );
    }

    if(this.simulationService.simulationEngine.isPlay) {
      this.simulationService.simulationEngine.pause();
    } else {
      this.simulationService.simulationEngine.run();
    }

  }


  public stopSimulation() {
    this.simulationService.simulationEngine.stop();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DesignerService } from 'src/app/designer/services/designer.service';
import { DeterminateDistribution } from '../../models/distributions/determinate-distribution';
import { Distribution } from '../../models/distributions/distribution';
import { DistributionType } from '../../models/distributions/distribution-type';
import { ExponetialDistribution } from '../../models/distributions/exponetial-distribution';
import { NormalDistribution } from '../../models/distributions/normal-distribution';
import { UniformDistribution } from '../../models/distributions/uniform-distribution';
import { SimulationService } from '../../services/simulation.service';
import { DialogConfigurateDistributionComponent } from '../dialog-configurate-distribution/dialog-configurate-distribution.component';

@Component({
  selector: 'app-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss'],
})
export class SimulationSetupComponent implements OnInit {
  public distributionTypes = DistributionType;
  public setupSimulationForm!: FormGroup;
  public selectedDistributionControl!: string;

  constructor(public simulationService: SimulationService, public dialog: MatDialog) {
    this.setupSimulationForm = simulationService.setupSimulationForm;
    this.selectedDistributionControl = '';
  }

  ngOnInit(): void {}

  public getNameDistribution(controlName: string): string {
    let distributionType: DistributionType =
      this.setupSimulationForm.controls[controlName].value.distributionType;

    if (distributionType === DistributionType.DETERMINATE)
      return 'Детерминированное';
    if (distributionType === DistributionType.NORMAL)
      return 'Нормальное';
    if (distributionType === DistributionType.EXPONETIAL)
      return 'Экспонециальное';
    if (distributionType === DistributionType.UNIFORM)
      return 'Равномерное';
    return 'NULL';
  }

  public setSelectedDistribution(distributionType: DistributionType) {
    switch (distributionType) {
      case DistributionType.DETERMINATE:
        this.setupSimulationForm.controls[
          this.selectedDistributionControl
        ].setValue(new DeterminateDistribution());
        break;
      case DistributionType.NORMAL:
        this.setupSimulationForm.controls[
          this.selectedDistributionControl
        ].setValue(new NormalDistribution());
        break;
      case DistributionType.EXPONETIAL:
        this.setupSimulationForm.controls[
          this.selectedDistributionControl
        ].setValue(new ExponetialDistribution());
        break;
      case DistributionType.UNIFORM:
        this.setupSimulationForm.controls[
          this.selectedDistributionControl
        ].setValue(new UniformDistribution());
        break;
    }
  }

  public setupDistribution(controlName:string) {
    const dialogRef = this.dialog.open(DialogConfigurateDistributionComponent, {
      data: this.setupSimulationForm.value[controlName],
    });
  }
}

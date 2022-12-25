import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DesignerService } from 'src/app/designer/services/designer.service';
import { SimulationService } from '../../services/simulation.service';


interface Distibution {
  value: string;
  viewValue: string;
}

interface DistibutionGroup {
  disabled?: boolean;
  name: string;
  distibutions: Distibution[];
}

@Component({
  selector: 'app-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss']
})
export class SimulationSetupComponent implements OnInit {
  public setupSimulationForm!: FormGroup;
  
  constructor(public simulationService: SimulationService) {
    this.setupSimulationForm = simulationService.setupSimulationForm;
  }

  ngOnInit(): void {
  }

}

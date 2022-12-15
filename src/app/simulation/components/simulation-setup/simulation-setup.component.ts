import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DesignerService } from 'src/app/designer/services/designer.service';

@Component({
  selector: 'app-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss']
})
export class SimulationSetupComponent implements OnInit {
  setupSimulationForm!:FormGroup;

  constructor(public designerService: DesignerService) {
    
    this.setupSimulationForm = new FormGroup({
      selectedTime: new FormControl(),
      cols: new FormControl(),
      rows: new FormControl(),
      directOfRoad: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

}

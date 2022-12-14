import { Component, OnInit } from '@angular/core';
import { DesignerService } from 'src/app/designer/services/designer.service';

@Component({
  selector: 'app-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss']
})
export class SimulationSetupComponent implements OnInit {
  
  constructor(public designerService: DesignerService) {
  }

  ngOnInit(): void {
  }

}

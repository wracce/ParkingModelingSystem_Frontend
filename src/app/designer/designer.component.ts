import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { DesignerService } from './services/designer.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {
  constructor(private designerService:DesignerService) { }

  ngOnInit(): void {
  }

  public selectionChange(event:StepperSelectionEvent):void {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1)
      this.designerService.fillCells();
    
  }
}

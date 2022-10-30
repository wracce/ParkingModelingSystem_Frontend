import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DesignerParkingComponent } from './components/designer-parking/designer-parking.component';
import { DesignerService } from './services/designer.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {
  @ViewChild(DesignerParkingComponent)
  private designerParkingComponent!: DesignerParkingComponent;
  constructor(private designerService:DesignerService) { }

  ngOnInit(): void {
  }

  public selectionChange(event:StepperSelectionEvent):void {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1)
      this.designerService.fillCells();
  }

  public zoomIn():void {
    this.designerParkingComponent.zoomIn();
  }

  public zoomFree():void {
    this.designerParkingComponent.zoomFree();
  }
  public zoomOut():void {
    this.designerParkingComponent.zoomOut();
  }
  
}

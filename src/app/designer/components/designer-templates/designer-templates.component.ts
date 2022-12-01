import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ParkingCell } from '../../models/parking-cell';
import { ParkingState } from '../../models/parking-state';
import { ParkingTemplate } from '../../models/parking-template';
import { ParkingTemplateGroup } from '../../models/parking-template-group';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-designer-templates',
  templateUrl: './designer-templates.component.html',
  styleUrls: ['./designer-templates.component.scss']
})
export class DesignerTemplatesComponent implements OnInit {
  types!:ParkingTemplateGroup;
  nameOfIdList:string ="";
  valueListConnectedTo:string[] =[];
  
  panelOpenState = false;
  parkingMap: any;

  selectedCells!: number[];
  constructor(public designerService:DesignerService) {}

  ngOnInit(): void {
    this.selectedCells = this.designerService.getSelectedCells();
    this.types = this.designerService.getTypes();
    this.nameOfIdList = this.designerService.getNameOfObjsList();
     this.valueListConnectedTo =this.designerService.getLinksToParkingCells();
  }

  isPark(template:ParkingTemplate):boolean {
    return template.state === ParkingState.Park;
  }
}

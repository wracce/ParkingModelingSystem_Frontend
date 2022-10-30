import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ParkingCell } from '../../models/parking-cell';
import { ParkingTemplate } from '../../models/parking-template';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-designer-templates',
  templateUrl: './designer-templates.component.html',
  styleUrls: ['./designer-templates.component.scss']
})
export class DesignerTemplatesComponent implements OnInit {
  indexOver: number = -1;
  types:ParkingTemplate[] = [];
  cells:ParkingCell[] = [];
  nameOfIdList:string ="";
  valueListConnectedTo:string[] =[];
  
  panelOpenState = false;

  constructor(private designerService:DesignerService) {}

  ngOnInit(): void {
    this.types = this.designerService.getTypes();
    this.cells = this.designerService.getCells();
    this.nameOfIdList = this.designerService.getNameOfObjsList();
    this.valueListConnectedTo =this.designerService.getLinksToCellList();
  }

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
  }

}

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ParkingCell } from '../../models/parking-cell';
import { ParkingTemplate } from '../../models/parking-template';
import { ParkingTemplateGroup } from '../../models/parking-template-group';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-designer-templates',
  templateUrl: './designer-templates.component.html',
  styleUrls: ['./designer-templates.component.scss']
})
export class DesignerTemplatesComponent implements OnInit {
  indexOver: number = -1;
  types!:ParkingTemplateGroup;
  nameOfIdList:string ="";
  valueListConnectedTo:string[] =[];
  
  panelOpenState = false;

  constructor(private designerService:DesignerService) {}

  ngOnInit(): void {
    this.types = this.designerService.getTypes();
    this.nameOfIdList = this.designerService.getNameOfObjsList();
     this.valueListConnectedTo =this.designerService.getLinksToParkingCells();
  }

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
  }

}

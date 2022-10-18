import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Cell } from '../cell';
import { DesignerService } from '../designer.service';

@Component({
  selector: 'app-park-designer',
  templateUrl: './park-designer.component.html',
  styleUrls: ['./park-designer.component.scss']
})
export class ParkDesignerComponent implements OnInit {
  indexOver: number = -1;
  icons:string[] = [];
  cols:number =0;
  cells:Cell[] = [];
  nameOfIdList:string ="";
  valueListConnectedTo: string[] =[];

  
  constructor(private designerService:DesignerService) {}

  ngOnInit(): void {
    this.cols = Math.sqrt(this.designerService.getLen());
    this.icons = this.designerService.getIcons();
    this.cells = this.designerService.getCells();
    this.nameOfIdList = this.designerService.getNameOfGridList();
    this.valueListConnectedTo.push(this.designerService.getNameOfObjsList());
  }

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
  }

}

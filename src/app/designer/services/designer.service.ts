import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ParkingCell } from '../models/parking-cell';
import { ParkingMap } from '../models/parking-map';
import { ParkingState } from '../models/parking-state';
import { ParkingTemplate } from '../models/parking-template';
import { ParkingTemplateGroup } from '../models/parking-template-group';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private linkOfParkingCell:string ="";
  private linkOfParkingTemplate:string = "";
  private linksToParkingCells:string[] = [];

  private parkingMap: ParkingMap = new ParkingMap();
  private parkingTemplateGroup!:ParkingTemplateGroup;
  private parkingCells:ParkingCell[]=[];

  constructor() { 
    this.parkingMap = new ParkingMap("",6, 6, "left");
    this.linkOfParkingCell = "designerCellList";
    this.linkOfParkingTemplate = "designerObjsList";
    this.parkingTemplateGroup = new ParkingTemplateGroup();
    this.fillCells();
  }
  public getParkingMap(): ParkingMap {
    return this.parkingMap;
  }
  public getTypes():ParkingTemplateGroup {
    return this.parkingTemplateGroup;
  }

  public getCells():ParkingCell[] {
    return this.parkingCells;
  }

  public getNameOfGridList():string {
    return this.linkOfParkingCell;
  }

  public getLinksToCellList():string[] {
    return this.linksToParkingCells;
  }

  public getNameOfObjsList():string {
    return this.linkOfParkingTemplate;
  }

  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer != event.container) {

      if (event.container.data instanceof ParkingCell) { //on board
        if (event.previousContainer.data instanceof ParkingTemplate) {// from side to board
          event.container.data.type = event.previousContainer.data;
        } else {  // from board to board
          event.container.data.type = event.previousContainer.data.type;
          event.previousContainer.data.type = new ParkingTemplate("", null,"",ParkingState.Undef,0);
        }
      }
    }
  }

  public fillCells():void {
    this.parkingCells.length = 0;
    for (let index = 0; index < this.parkingMap.getSize(); index++) {
      this.parkingCells.push(new ParkingCell(new ParkingTemplate("", null,"",ParkingState.Undef,0),index));
    }

    this.linksToParkingCells.length = 0;
    for (let index = 0; index < this.getParkingMap().getSize(); index++) {
      this.linksToParkingCells.push(this.getNameOfGridList()+index);
    }
  }  
}

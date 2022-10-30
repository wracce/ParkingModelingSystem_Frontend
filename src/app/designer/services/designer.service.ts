import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ParkingCell } from '../models/parking-cell';
import { ParkingMap } from '../models/parking-map';
import { ParkingState } from '../models/parking-state';
import { ParkingTemplate } from '../models/parking-template';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private linkOfCell:string ="";
  private linkOfObjsList:string = "";
  private linksToCellList:string[] = [];

  private parkingMap: ParkingMap = new ParkingMap();
  private types:ParkingTemplate[] =[];
  private cells:ParkingCell[]=[];

  constructor() { 
    this.parkingMap = new ParkingMap("test",6, 6, "left");
    this.linkOfCell = "designerCellList";
    this.linkOfObjsList = "designerObjsList";
    this.types = [
      new ParkingTemplate('/assets/car/car1.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car2.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car3.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car4.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car5.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car6.png',"Машины",ParkingState.Car,0),
      new ParkingTemplate('/assets/car/car7.png',"Машины",ParkingState.Car,0),

    ];
    this.fillCells();
  }
  public getParkingMap(): ParkingMap {
    return this.parkingMap;
  }
  public getTypes():ParkingTemplate[] {
    return this.types;
  }

  public getCells():ParkingCell[] {
    return this.cells;
  }

  public getNameOfGridList():string {
    return this.linkOfCell;
  }

  public getLinksToCellList():string[] {
    return this.linksToCellList;
  }

  public getNameOfObjsList():string {
    return this.linkOfObjsList;
  }

  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer != event.container) {

      if (event.container.data instanceof ParkingCell) { //on board
        if (event.previousContainer.data instanceof ParkingTemplate) {// from side to board
          event.container.data.type = event.previousContainer.data;
        } else {  // from board to board
          event.container.data.type = event.previousContainer.data.type;
          event.previousContainer.data.type = new ParkingTemplate(null,"",ParkingState.Undef,0);
        }
      }
    }
  }

  public fillCells():void {
    this.cells.length = 0;
    for (let index = 0; index < this.parkingMap.getSize(); index++) {
      this.cells.push(new ParkingCell(new ParkingTemplate(null,"",ParkingState.Undef,0),index));
    }

    this.linksToCellList.length = 0;
    for (let index = 0; index < this.getParkingMap().getSize(); index++) {
      this.linksToCellList.push(this.getNameOfGridList()+index);
    }
  }  
}

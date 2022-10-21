import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { CellType } from './cell-type';
import { CellState } from './cell-state';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private nameOfGridList:string ="";
  private nameOfObjsList:string = "";
  private len:number = 0;
  private types:CellType[] =[];
  private cells:Cell[]=[];

  constructor() { 
    this.len=25;
    this.nameOfGridList = "designerCellList";
    this.nameOfObjsList = "designerObjsList";
    this.types = [
      new CellType('/assets/car/car1.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car2.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car3.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car4.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car5.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car6.png',"Машины",CellState.Car,0),
      new CellType('/assets/car/car7.png',"Машины",CellState.Car,0),

    ];
    for (let index = 0; index < this.len; index++) {
      this.cells.push(new Cell(new CellType(null,"",CellState.Undef,0),index));
    }
  }

  public getTypes():CellType[] {
    return this.types;
  }

  public getCells():Cell[] {
    return this.cells;
  }
  
  public getLen():number {
    return this.len;
  }

  public getNameOfGridList():string {
    return this.nameOfGridList;
  }

  public getNameOfObjsList():string {
    return this.nameOfObjsList;
  }

  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer != event.container) {

      if (event.container.data instanceof Cell) { //on board
        if (event.previousContainer.data instanceof CellType) {// from side to board
          event.container.data.type = event.previousContainer.data;
        } else {  // from board to board
          event.container.data.type = event.previousContainer.data.type;
          event.previousContainer.data.type = new CellType(null,"",CellState.Undef,0);
        }
      }
    }
  }
}

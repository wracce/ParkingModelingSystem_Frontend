import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private nameOfGridList:string ="";
  private nameOfObjsList:string = "";
  private len:number = 0;
  private icons:string[] =[];
  private cells:Cell[]=[];

  constructor() { 
    this.len=64;
    this.nameOfGridList = "designerCellList";
    this.nameOfObjsList = "designerObjsList";
    this.icons = [
      'https://source.unsplash.com/random/200x200?sig=1',
      'https://source.unsplash.com/random/200x200?sig=2',
      'https://source.unsplash.com/random/200x200?sig=3',
      'https://source.unsplash.com/random/200x200?sig=4',
      'https://source.unsplash.com/random/200x200?sig=5',
    ];
    for (let index = 0; index < this.len; index++) {
      this.cells.push(new Cell(null,index));
    }
  }

  public getIcons():string[] {
    return this.icons;
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
    console.log(event);
    if (event.previousContainer != event.container) {
      
      if (event.container.data.src !== undefined) { //we are drop on "board"
        if (event.previousContainer.data.src != undefined) { //we are dragging an element of "board"
          event.container.data.src = event.previousContainer.data.src;
          event.previousContainer.data.src = null;
        } else {  //we are dragging an element of "side"
          event.container.data.src = event.previousContainer.data;
        }
      } else {
        if (
          event.container.data.src === undefined &&
          event.previousContainer.data.src !== undefined
        ) //we are drop an img from "board" on the "side"
          event.previousContainer.data.src = null;
      }
    }
  }
}

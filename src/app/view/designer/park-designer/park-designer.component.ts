import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Cell } from '../cell';
import { DesignerService } from '../designer.service';

@Component({
  selector: 'app-park-designer',
  templateUrl: './park-designer.component.html',
  styleUrls: ['./park-designer.component.css']
})
export class ParkDesignerComponent implements OnInit {
  indexOver: number = -1;
  icons:string[] = [];
  cells:Cell[] = [];
  
  constructor(private designerService:DesignerService) {}

  ngOnInit(): void {
    this.icons = this.designerService.getIcons();
    this.cells = this.designerService.getCells();
  }

  drop(event: CdkDragDrop<any>) {
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

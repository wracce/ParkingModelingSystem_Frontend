import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-park-designer',
  templateUrl: './park-designer.component.html',
  styleUrls: ['./park-designer.component.css']
})
export class ParkDesignerComponent implements OnInit {
  indexOver: number = -1;

  icons = [
    'https://source.unsplash.com/random/200x200?sig=1',
    'https://source.unsplash.com/random/200x200?sig=2',
    'https://source.unsplash.com/random/200x200?sig=3',
    'https://source.unsplash.com/random/200x200?sig=4',
    'https://source.unsplash.com/random/200x200?sig=5',
    
  ];

  cells = Array(25)
    .fill(' ')
    .map((_, index) => ({ src: null, id: index }));
  constructor() {}

  ngOnInit(): void {
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

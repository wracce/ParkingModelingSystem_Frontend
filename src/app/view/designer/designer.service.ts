import { Injectable } from '@angular/core';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private icons:string[] =[];
  private cells:Cell[]=[];

  constructor() { 
    this.icons = [
      'https://source.unsplash.com/random/200x200?sig=1',
      'https://source.unsplash.com/random/200x200?sig=2',
      'https://source.unsplash.com/random/200x200?sig=3',
      'https://source.unsplash.com/random/200x200?sig=4',
      'https://source.unsplash.com/random/200x200?sig=5',
    ];
    for (let index = 0; index < 25; index++) {
      this.cells.push(new Cell(null,index));
    }
  }

  
  public getIcons():string[] {
    return this.icons;
  }

  public getCells():Cell[] {
    return this.cells;
  }
  
}

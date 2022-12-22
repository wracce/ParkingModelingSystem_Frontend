import { CarTemplate } from './car-template';
import { ICar } from './icar';
import {SimulationEngine} from "./simulation-engine";
import {RouteCar} from "./route-car";
import {Inject} from "@angular/core";

export class Car implements ICar {
  private timeId!: NodeJS.Timer;
  private path!: {x:number, y:number}[];
  private isPathEmpty!: boolean;

  constructor(
    public x: number,
    public y: number,
    public angle: number,
    public simulationEngine:SimulationEngine,
    public isVisit: boolean, // хочет ли машина заехать
    public template: CarTemplate,
  ) {
    this.isPathEmpty = true;
    this.path = [];
  }

  public step() { // проверка на занятость парковки. Обращение к объекту паркомата

    if(this.isPathEmpty){
      this.path = RouteCar.getPathToDest(
        this.simulationEngine.simulationService.simulationMap,
        this.simulationEngine.simulationService.simulationMap.parkingCells[0],
        this.simulationEngine.simulationService.simulationMap.parkingCells[34]);
        
      this.isPathEmpty=false;
    }else {

      if (this.path.length == 0){
        this.isPathEmpty = true;
        return;
      }
      let id =this.path.shift()!;
      let xy = this.getCoordinateForPosition(id);
      this.x = xy.x;
      this.y = xy.y;
    }
    //switch ()
  }

  private move(coord: number):number {
    return coord + this.template.width;
  }

  private getCoordinateForPosition(xy:{x:number, y:number}):{x:number,y:number} {
    let sizecell = this.simulationEngine.simulationService.boardView.sizeCell;

    let newx = sizecell*(xy.x);
    let newy = sizecell*(xy.y);
    return {x:newx,y:newy}
}
}

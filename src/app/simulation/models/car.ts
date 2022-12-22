import { CarTemplate } from './car-template';
import { ICar } from './icar';
import {SimulationEngine} from "./simulation-engine";
import {RouteCar} from "./routeCar";
import {Inject} from "@angular/core";

export class Car implements ICar {
  private timeId!: NodeJS.Timer;
  private path!: number[];
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
        this.simulationEngine.simulationService.simulationMap.getParkingCells()[6],
        this.simulationEngine.simulationService.simulationMap.getParkingCells()[20]);
      this.isPathEmpty=false;
    }else {
      if (this.path.length == 0){
        this.isPathEmpty = true;
        return;
      }
      let id:number =this.path.shift()!;
      let xy = this.getXY(id);
      this.x = xy.x;
      this.y = xy.y;
      console.log(this.x, this.y);
      //console.log(this.path);
    }
    //switch ()
  }

  private move(coord: number):number {
    return coord + this.template.width;
  }

  private getXY(id:number):{x:number,y:number} {
    console.log("id: ", id)
    let xy = this.simulationEngine.simulationService.simulationMap.atId(id);
    let sizecell = this.simulationEngine.simulationService.boardView.sizeCell;

    let newx = sizecell*(xy.xPos - 0.5);
    let newy = sizecell*(xy.yPos - 0.5);
    return {x:newx,y:newy}
}
}

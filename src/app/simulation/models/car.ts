import { CarTemplate } from './car-template';
import { ICar } from './icar';
import {SimulationEngine} from "./simulation-engine";

export class Car implements ICar {
  private timeId!: NodeJS.Timer;

  constructor(
    public x: number,
    public y: number,
    public angle: number,
    public simulationEngine:SimulationEngine,
    public isVisit: boolean, // хочет ли машина заехать
    public template: CarTemplate
  ) {}

  public step() { // проверка на занятость парковки. Обращение к объекту паркомата
    if (this.isVisit) {
      this.x += 100;
    }
  }

  private move(coord: number):number {
    return coord + this.template.width;
  }
}

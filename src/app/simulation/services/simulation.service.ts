import { Injectable } from '@angular/core';
import { ParkingMap } from 'src/app/designer/models/parking-map';
import { Car } from '../models/car';
import { CarTemplate } from '../models/car-template';
import { SimulationEngine } from '../models/simulation-engine';
import { SimulationMap } from '../models/simulation-map';
import {BoardView} from "../models/board-view";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  public simulationMap!:SimulationMap;
  public simulationEngine!:SimulationEngine;
  public carTemplates!: CarTemplate[];
  public truckTemplates!: CarTemplate[];

  public boardView!:BoardView;
  constructor() {
    this.simulationMap = new SimulationMap();
    this.simulationEngine = new SimulationEngine(this);
    this.carTemplates = [
      new CarTemplate('/assets/cars/car1.png',145,86),
      new CarTemplate('/assets/cars/car2.png',86,145),
      new CarTemplate('/assets/cars/car3.png',86,145),
      new CarTemplate('/assets/cars/car4.png',86,145),
      new CarTemplate('/assets/cars/car5.png',86,145),
      new CarTemplate('/assets/cars/car6.png',86,145),
    ];
    this.truckTemplates = [
      new CarTemplate('/assets/cars/truck1.png',145,86),
      new CarTemplate('/assets/cars/truck2.png',86,145),
    ];
    this.boardView = new BoardView(0,0,0);
  }
}

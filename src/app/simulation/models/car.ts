import { CarTemplate } from './car-template';
import { ICar } from './icar';
import { SimulationEngine } from './simulation-engine';
import { RouteCar } from './route-car';
import { Inject } from '@angular/core';
import { ParkingCell } from 'src/app/designer/models/parking-cell';
import { ParkingPlace } from './ParkingSystem/parkingPlace';
import {Coordinates} from "../../designer/models/parking-map";
enum CarSimulationState {
  INIT,
  TO_PARK,
  FROM_PARK,
}
export enum CarType {
  Car,
  Truck
}
export class Car implements ICar {
  private timeId!: NodeJS.Timer;
  private path!: { x: number; y: number }[];
  private state: CarSimulationState;
  private parkingPlace!: ParkingPlace | null;

  constructor(
    public currentCellId: number,
    public x: number,
    public y: number,
    public angle: number,
    public simulationEngine: SimulationEngine,
    public isVisit: boolean, // хочет ли машина заехать
    public template: CarTemplate,
    public carType: CarType,
  ) {
    this.state = CarSimulationState.INIT;
    this.step();
  }

  public step() {
    // проверка на занятость парковки. Обращение к объекту паркомата
    switch (this.state) {
      case CarSimulationState.INIT:
        console.log("Parking places: ", this.simulationEngine.simulationService.simulationMap.parkingMeter.parkingPlaces);
        this.parkingPlace = this.simulationEngine.simulationService.simulationMap.parkingMeter.getAvailableParkingPlaceForCars();

        if (this.parkingPlace == null){
          this.state = CarSimulationState.FROM_PARK;
          this.step();
        } else {
          this.parkingPlace!.available = false;
          this.path = RouteCar.getPathToDest(
            this.simulationEngine.simulationService.simulationMap,
            this.simulationEngine.simulationService.simulationMap.parkingCells[0],
            this.parkingPlace.parkingCell,
            this.simulationEngine.simulationService.simulationMap.startBarrierCell);
            this.state = CarSimulationState.TO_PARK;
        }
        break;
      case CarSimulationState.TO_PARK:
        let xy = this.path.shift()!;
        let coords = this.getCoordinateForPosition(xy);
        this.x = coords.x;
        this.y = coords.y;

        if (this.path.length == 0) this.state = CarSimulationState.FROM_PARK;
        this.rotateCar(xy);
        this.currentCellId = this.simulationEngine.simulationService.simulationMap.atXYid(xy.x, xy.y);
        break;

      case CarSimulationState.FROM_PARK:
      default:
        break;
    }

    //directOfRoad: "left", "right", "bottom", "top"
  }

  private rotateCar(xy: {x: number, y:number}) {
    let nextCellId = this.simulationEngine.simulationService.simulationMap.atXYid(xy.x, xy.y);
    let currentCoords: Coordinates = {
      xPos: this.simulationEngine.simulationService.simulationMap.atId(this.currentCellId).x,
      yPos: this.simulationEngine.simulationService.simulationMap.atId(this.currentCellId).y,
    };
    if (nextCellId === this.simulationEngine.simulationService.simulationMap.atXYid(currentCoords.xPos - 1, currentCoords.yPos)) {
      this.angle = -90;
    } else if (nextCellId === this.simulationEngine.simulationService.simulationMap.atXYid(currentCoords.xPos, currentCoords.yPos - 1)) {
      this.angle = 0;
    } else if (nextCellId === this.simulationEngine.simulationService.simulationMap.atXYid(currentCoords.xPos + 1, currentCoords.yPos)) {
      this.angle = 90;
    } else if (nextCellId === this.simulationEngine.simulationService.simulationMap.atXYid(currentCoords.xPos, currentCoords.yPos + 1)) {
      this.angle = 180;
    }
  }

  private getCoordinateForPosition(xy: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    let sizecell = this.simulationEngine.simulationService.boardView.sizeCell;

    let newx = sizecell * xy.x;
    let newy = sizecell * xy.y;
    return { x: newx, y: newy };
  }
}

import {CarTemplate} from './car-template';
import {ICar} from './icar';
import {SimulationEngine} from './simulation-engine';
import {RouteCar} from './route-car';
import {Inject} from '@angular/core';
import {ParkingCell} from 'src/app/designer/models/parking-cell';
import {ParkingPlace} from './ParkingSystem/parkingPlace';
import {Coordinates} from "../../designer/models/parking-map";

export enum CarSimulationState {
  INIT,
  INIT_TO,
  INIT_FROM,
  NAVIGATE,
  FROM_PARK,
  END
}

export enum CarType {
  Car,
  Truck
}

export class Car implements ICar {
  private timeId!: NodeJS.Timer;
  private path!: { x: number; y: number }[];
  private parkingPlace!: ParkingPlace | null;
  private prevState: CarSimulationState;
  public state: CarSimulationState;
  public x: number;
  public y: number;

  constructor(
    public currentCellId: number,
    public endCellId: number,

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
    let xy;
    let coords;
    // проверка на занятость парковки. Обращение к объекту паркомата
    switch (this.state) {

      case CarSimulationState.INIT:
        let xy2 = this.getCoordinateForPosition(this.simulationEngine.simulationService.simulationMap.getPosById(this.currentCellId));
        this.x = xy2.x;
        this.y = xy2.y;

        console.log("Parking places: ", this.simulationEngine.simulationService.simulationMap.parkingMeter.parkingPlaces);
        if (this.carType === CarType.Car)
          this.parkingPlace = this.simulationEngine.simulationService.simulationMap.parkingMeter.getAvailableParkingPlaceForCars();
        else
          this.parkingPlace = this.simulationEngine.simulationService.simulationMap.parkingMeter.getAvailableParkingPlaceForTrucks();
        if (this.parkingPlace == null) {
          this.state = CarSimulationState.INIT_FROM;
          // this.step();
        } else {
          this.state = CarSimulationState.INIT_TO;
          this.parkingPlace.available = false;
          // this.step();
        }
        break;
      case CarSimulationState.INIT_TO:
        this.findPath(
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(x => x.id === this.currentCellId)!,
          this.parkingPlace!.parkingCell,
          this.simulationEngine.simulationService.simulationMap.startBarrierCell,
        );
        this.state = CarSimulationState.NAVIGATE;
        this.prevState = CarSimulationState.INIT_TO;
        break;

      case CarSimulationState.INIT_FROM:
        this.findPath(
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(x => x.id === this.currentCellId)!,
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(x => x.id === this.endCellId)!,
          this.simulationEngine.simulationService.simulationMap.endBarrierCell,
        );
        this.state = CarSimulationState.NAVIGATE;
        this.prevState = CarSimulationState.INIT_FROM;
        break;

      case CarSimulationState.NAVIGATE:
        xy = this.path.shift()!;
        coords = this.getCoordinateForPosition(xy);
        this.x = coords.x;
        this.y = coords.y;

        if (this.path.length == 0) {
          if (this.prevState == CarSimulationState.INIT_TO) {
            this.parkingPlace!.available = true;
            this.state = CarSimulationState.INIT_FROM;
          } else if (this.prevState == CarSimulationState.INIT_FROM){
            this.state = CarSimulationState.END;
          }
        }
        this.rotateCar(xy);
        this.currentCellId = this.simulationEngine.simulationService.simulationMap.getIdByPos(xy.x, xy.y);
        break;

      default:
        break;
    }
  }

  private rotateCar(xy: { x: number, y: number }) {
    let nextCellId = this.simulationEngine.simulationService.simulationMap.getIdByPos(xy.x, xy.y);
    let currentCoords: Coordinates = {
      xPos: this.simulationEngine.simulationService.simulationMap.getPosById(this.currentCellId).x,
      yPos: this.simulationEngine.simulationService.simulationMap.getPosById(this.currentCellId).y,
    };
    if (nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(currentCoords.xPos - 1, currentCoords.yPos)) {
      this.angle = -90;
    } else if (nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(currentCoords.xPos, currentCoords.yPos - 1)) {
      this.angle = 0;
    } else if (nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(currentCoords.xPos + 1, currentCoords.yPos)) {
      this.angle = 90;
    } else if (nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(currentCoords.xPos, currentCoords.yPos + 1)) {
      this.angle = 180;
    }
  }

  private getCoordinateForPosition(xy: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    let sizecell = this.simulationEngine.simulationService.boardView.cellSize;

    let newx = sizecell * xy.x;
    let newy = sizecell * xy.y;
    return {x: newx, y: newy};
  }

  private findPath(sourceCell: ParkingCell, destCell: ParkingCell, barrierCell: ParkingCell) {
    this.path = RouteCar.getPathToDest(
      this.simulationEngine.simulationService.simulationMap,
      sourceCell,
      destCell,
      barrierCell);
  }

}

import {CarTemplate} from './car-template';
import {ICar} from './icar';
import {SimulationEngine} from './simulation-engine';
import {RouteCar} from './route-car';
import {Inject} from '@angular/core';
import {ParkingCell} from 'src/app/designer/models/parking-cell';
import {ParkingPlace} from './ParkingSystem/parkingPlace';
import {Coordinates, ParkingMap} from '../../designer/models/parking-map';
import {SimulationTime} from "./simulation-time";
import {SimulationService} from "../services/simulation.service";
import {TableRow} from "./table-row";

export enum CarSimulationState {
  INIT,
  INIT_TO,
  INIT_FROM,
  NAVIGATE,
  STAY,
  END,
}

export enum CarType {
  Car,
  Truck,
}

export class Car implements ICar {
  public isVisible!: boolean;
  private timeId!: NodeJS.Timer;
  public path!: { x: number; y: number }[];
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
    public stayTime: number,
    public simulationTime: SimulationTime,
    private currentTime: number = 0,
    private simulationService: SimulationService
  ) {
    this.state = CarSimulationState.INIT;
    this.path = [];
    this.isVisible = false;
    this.step();
  }
  private addToTable(): void { //FIXME: новый метод добавления в таблицу.
    // ИЗМЕНЕНИЯ В РАМКАХ ДОБАВЛЕНИЯ В ТАБЛИЦУ ВНЕСЕНЫ В ФАЙЛЫ:
    // simulationService(методы в конце файла), simulationComponent (методы в конце файла), Car(метод
    // addToTable, вызывается в step.INIT
    // Я пытался подрубить rxJS, но чёт не работает...
    // А еще у нас какие то приколы с stayTime - оно бывает ниже нуля.

    this.simulationService.parkingTable.push(new TableRow(
      1,
      this.simulationTime.time,
      this.stayTime,
      5000)
    );
    this.simulationService.sendNotification(true);
    console.log(this.simulationService.parkingTable);
  }
  public step() {
    let xy;
    let coords;
    // проверка на занятость парковки. Обращение к объекту паркомата
    switch (this.state) {
      case CarSimulationState.INIT:

        let xy2 = this.getCoordinateForPosition(
          this.simulationEngine.simulationService.simulationMap.getPosById(
            this.currentCellId
          )
        );
        this.x = xy2.x;
        this.y = xy2.y;

        if (this.carType === CarType.Car)
          this.parkingPlace =
            this.simulationEngine.simulationService.simulationMap.parkingMeter.getAvailableParkingPlaceForCars();
        else
          this.parkingPlace =
            this.simulationEngine.simulationService.simulationMap.parkingMeter.getAvailableParkingPlaceForTrucks();

        if (this.parkingPlace == null || this.isVisit == false) {
          this.state = CarSimulationState.INIT_FROM;
        } else {
          this.state = CarSimulationState.INIT_TO;
          this.parkingPlace.available = false;
          this.addToTable();
        }
        break;
      case CarSimulationState.INIT_TO:
        this.findPath(
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(
            (x) => x.id === this.currentCellId
          )!,
          this.parkingPlace!.parkingCell,
          this.simulationEngine.simulationService.simulationMap.parkingMeter.startBarrierCell
        );
        this.state = CarSimulationState.NAVIGATE;
        this.prevState = CarSimulationState.INIT_TO;
        this.step();
        break;

      case CarSimulationState.INIT_FROM:
        this.findPath(
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(
            (x) => x.id === this.currentCellId
          )!,
          this.simulationEngine.simulationService.simulationMap.parkingCells.find(
            (x) => x.id === this.endCellId
          )!,
          this.simulationEngine.simulationService.simulationMap.parkingMeter.endBarrierCell
        );
        this.state = CarSimulationState.NAVIGATE;
        this.prevState = CarSimulationState.INIT_FROM;

        break;

      case CarSimulationState.STAY:
        if (this.currentTime >= this.stayTime) {
          this.parkingPlace!.available = true;
          this.state = CarSimulationState.INIT_FROM;
        } else {
          this.currentTime += this.simulationTime.realTickMs;
        }
        break;

      case CarSimulationState.NAVIGATE:
        this.isVisible = true;
        xy = this.path.shift()!;
        coords = this.getCoordinateForPosition(xy);
        this.x = coords.x;
        this.y = coords.y;

        if (this.path.length == 0) {
          if (this.prevState == CarSimulationState.INIT_TO) {
            this.state = CarSimulationState.STAY;
          } else if (this.prevState == CarSimulationState.INIT_FROM) {
            this.state = CarSimulationState.END;
          }
        }
        this.rotateCar(xy);
        this.currentCellId =
          this.simulationEngine.simulationService.simulationMap.getIdByPos(
            xy.x,
            xy.y
          );
        break;

      default:
        break;
    }
  }

  private rotateCar(xy: { x: number; y: number }) {
    let nextCellId =
      this.simulationEngine.simulationService.simulationMap.getIdByPos(
        xy.x,
        xy.y
      );
    let currentCoords: Coordinates = {
      xPos: this.simulationEngine.simulationService.simulationMap.getPosById(
        this.currentCellId
      ).x,
      yPos: this.simulationEngine.simulationService.simulationMap.getPosById(
        this.currentCellId
      ).y,
    };
    if (
      nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(
        currentCoords.xPos - 1,
        currentCoords.yPos
      )
    ) {
      this.angle = -90;
    } else if (
      nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(
        currentCoords.xPos,
        currentCoords.yPos - 1
      )
    ) {
      this.angle = 0;
    } else if (
      nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(
        currentCoords.xPos + 1,
        currentCoords.yPos
      )
    ) {
      this.angle = 90;
    } else if (
      nextCellId ===
      this.simulationEngine.simulationService.simulationMap.getIdByPos(
        currentCoords.xPos,
        currentCoords.yPos + 1
      )
    ) {
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

  private findPath(
    sourceCell: ParkingCell,
    destCell: ParkingCell,
    barrierCell: ParkingCell
  ) {
    this.path = RouteCar.getPathToDest(
      this.simulationEngine.simulationService.simulationMap,
      sourceCell,
      destCell,
      barrierCell
    );
  }
}

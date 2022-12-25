import { ParkingCell } from '../../../designer/models/parking-cell';
import { ParkingMap } from '../../../designer/models/parking-map';
import { ParkingPlace } from './parkingPlace';
import { SimulationEngine } from '../simulation-engine';
import { SimulationService } from '../../services/simulation.service';
import { ParkingState } from '../../../designer/models/parking-state';
import { SimulationMap } from '../simulation-map';

export class ParkingMeter {
  public simulationMap: SimulationMap;

  public parkingMeterCell: ParkingCell;
  public parkingPlaces!: ParkingPlace[];
  public isOpenEndBarrier!: boolean;
  public isOpenStartBarrier!: boolean;
  public startBarrierCell!: ParkingCell;
  public endBarrierCell!: ParkingCell;

  private DELAY: number = 2;
  private cntStartDelay!: number;
  private cntEndDelay!: number;


  constructor(public simulationService: SimulationService) {}

  public init(simulationMap: SimulationMap, parkingMeterCell: ParkingCell) {
    this.simulationMap = simulationMap;
    this.parkingMeterCell = parkingMeterCell;

    this.cntStartDelay = 0;
    this.cntEndDelay = 0;
    this.isOpenEndBarrier = false;
    this.isOpenStartBarrier = false;
    this.parkingPlaces = simulationMap.parkingCells
      .filter((x) => x.template.state === ParkingState.Park)
      .map((x) => new ParkingPlace(x, true));
  }
  public getAvailableParkingPlaceForCars(): ParkingPlace | null {
    return this.parkingPlaces.filter(
      (x) =>
        x.parkingCell.template.cols * x.parkingCell.template.rows == 1 &&
        x.available == true
    )[0];
  }

  public getAvailableParkingPlaceForTrucks(): ParkingPlace | null {
    return this.parkingPlaces.filter(
      (x) =>
        x.parkingCell.template.cols * x.parkingCell.template.rows > 1 &&
        x.available == true
    )[0];
  }

  public isAvailablePlace(): boolean {
    return this.parkingPlaces.filter((x) => x.available == true).length > 0;
  }

  public configurateBarrier() {
    if (this.cntStartDelay > this.DELAY) {
      this.isOpenStartBarrier = false;
      this.cntStartDelay = 0;
    }
    if (this.cntEndDelay > this.DELAY) {
      this.isOpenEndBarrier = false;
      this.cntEndDelay = 0;
    }

    this.simulationService.simulationEngine.cars.forEach((element) => {
      if (element.path.length > 0) {
        if (
          this.startBarrierCell.id ==
          element.simulationEngine.simulationService.simulationMap.getIdByPos(
            element.path[0].x,
            element.path[0].y
          )
        ) {
          this.isOpenStartBarrier = true;
          this.cntStartDelay = 1;
        }
        if (
          this.endBarrierCell.id ==
          element.simulationEngine.simulationService.simulationMap.getIdByPos(
            element.path[0].x,
            element.path[0].y
          )
        ) {
          this.isOpenEndBarrier = true;
          this.cntEndDelay = 1;
        }
      }
    });

    if (this.cntStartDelay > 0)
      this.cntStartDelay++;
    if (this.cntEndDelay > 0)
      this.cntEndDelay++;
  }

  public getCountAllCars():number {
    return this.parkingPlaces.filter(element => element.parkingCell.template.cols*element.parkingCell.template.rows==1).length;
  }

  public getCountAllTrucks():number {
    return this.parkingPlaces.filter(element => element.parkingCell.template.cols*element.parkingCell.template.rows>1).length;
 
  }

  public getCountAllFreeCars():number {
    return this.parkingPlaces.filter(element => element.parkingCell.template.cols*element.parkingCell.template.rows==1 && element.available == true).length;

  }

  public getCountAllFreeTrucks():number {
    return this.parkingPlaces.filter(element => element.parkingCell.template.cols*element.parkingCell.template.rows>1 && element.available == true).length;
    
  }

  public getCountAllFree():number {
    return this.parkingPlaces.filter(element => element.available == true).length;

  }

  public getCountAll():number {
    return this.parkingPlaces.length;
  }

  public reset(){
    this.parkingPlaces.forEach(x=>x.available=true);
  }
}

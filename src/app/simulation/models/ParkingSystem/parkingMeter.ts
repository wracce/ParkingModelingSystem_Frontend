import {ParkingCell} from "../../../designer/models/parking-cell";
import {ParkingMap} from "../../../designer/models/parking-map";
import {ParkingPlace} from "./parkingPlace";
import {SimulationEngine} from "../simulation-engine";
import {SimulationService} from "../../services/simulation.service";
import {ParkingState} from "../../../designer/models/parking-state";
import { SimulationMap } from "../simulation-map";


export class ParkingMeter {
  public parkingPlaces!: ParkingPlace[];

  constructor(
    public simulationMap: SimulationMap, public parkingMeterCell:ParkingCell
  ) {
    this.parkingPlaces = this.simulationMap.parkingCells.filter(
      x => x.template.state === ParkingState.Park
    ).map(x=> new ParkingPlace(x,true));
  }

  public getAvailableParkingPlaceForCars(): ParkingPlace|null {

    return this.parkingPlaces.filter(x=> x.parkingCell.template.cols*x.parkingCell.template.cols == 1 && x.available == true)[0];
  }


  public getAvailableParkingPlaceForTrucks(): ParkingPlace|null {
    return this.parkingPlaces.filter(x=> x.parkingCell.template.cols*x.parkingCell.template.cols > 1 && x.available == true)[0];
  }

  public isAvailablePlace(): boolean {
    return this.parkingPlaces.filter(x=> x.available == true).length > 0;
  }



}

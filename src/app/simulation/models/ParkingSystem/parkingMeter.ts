import {ParkingCell} from "../../../designer/models/parking-cell";
import {ParkingMap} from "../../../designer/models/parking-map";
import {ParkingPlace} from "./parkingPlace";
import {SimulationEngine} from "../simulation-engine";
import {SimulationService} from "../../services/simulation.service";
import {ParkingState} from "../../../designer/models/parking-state";


export class ParkingMeter {
  constructor(
    private parkingPlaces: ParkingPlace[],
    private simService: SimulationService
  ) {
    let cells:ParkingCell[] = this.simService.parkingMap.parkingCells.find(
      x => x.template.state === ParkingState.Park
    );
    cells.forEach(x=>x.id%simService.parkingMap.rows)
    )

  }

  public isCarPlaceFree(): boolean {

    return true;
  }

  public isTruckPlaceFree(): boolean {
    return true;
  }



}

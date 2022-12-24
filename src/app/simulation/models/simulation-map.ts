import { ParkingCell } from 'src/app/designer/models/parking-cell';
import { ParkingMap } from 'src/app/designer/models/parking-map';
import { ParkingState } from 'src/app/designer/models/parking-state';
import { SimulationService } from '../services/simulation.service';
import { ParkingMeter } from './ParkingSystem/parkingMeter';
import { SimulationEngine } from './simulation-engine';

export class SimulationMap extends ParkingMap {
  public parkingMeter!: ParkingMeter;

  constructor(public simulationService:SimulationService) {
    super();
  }

  public load(parkingMap: ParkingMap): void {
    this.getCells().length = 0;
    this.getCells().push(...parkingMap.parkingCells);
    this.name = parkingMap.name;
    this.cols = parkingMap.cols;
    this.widthOfRoad = parkingMap.widthOfRoad;
    this.rows = parkingMap.rows;
    this.directOfRoad = parkingMap.directOfRoad;

    this.parkingMeter = new ParkingMeter(this.simulationService);
    this.parkingMeter.init(      this,
      this.parkingCells.filter(
        (x) => x.template.state === ParkingState.ParkingMeter
      )[0])


    this.parkingCells.forEach((value, id) => {
      if (value.template.state === ParkingState.Barrier) {
        let xy = this.getPosById(id);
        let isNearParkingMeter = false;
        if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.getIdByPos(xy.x - 1, xy.y)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.getIdByPos(xy.x, xy.y - 1)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.getIdByPos(xy.x + 1, xy.y)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.getIdByPos(xy.x, xy.y + 1)]) {
          isNearParkingMeter = true;
        }
        if (isNearParkingMeter)
            this.parkingMeter.startBarrierCell = this.parkingCells[this.getIdByPos(xy.x,xy.y)];
        else
            this.parkingMeter.endBarrierCell = this.parkingCells[this.getIdByPos(xy.x,xy.y)];
      }
    });
  }
}

import {ParkingMap} from 'src/app/designer/models/parking-map';
import {ParkingState} from 'src/app/designer/models/parking-state';
import {SimulationService} from '../services/simulation.service';
import {ParkingMeter} from './ParkingSystem/parkingMeter';

export class SimulationMap extends ParkingMap {
  public parkingMeter!: ParkingMeter;

  constructor(public simulationService: SimulationService) {
    super();
  }

  public override from(parkingMap: ParkingMap): void {
    super.from(parkingMap);

    this.parkingMeter = new ParkingMeter(this.simulationService);
    this.parkingMeter.init(this,
      this.parkingCells.filter(
        (x) => x.template.state === ParkingState.ParkingMeter
      )[0])

    let barriersArr = this.parkingCells.filter(val => val.template.state === ParkingState.Barrier);
    this.parkingCells.forEach((value, id) => {
      for (let i = 0; i < barriersArr.length; i++) {
        let isNearParkingMeter = false;
        let barrierXY = this.simulationService.simulationMap.getPosById(barriersArr[i].id);
        let id: number = this.simulationService.simulationMap.getIdByPos(barrierXY.x - 1, barrierXY.y);
        if (id >= 0) {
          if (this.simulationService.simulationMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
            isNearParkingMeter = true;
          }
        }
        id = this.simulationService.simulationMap.getIdByPos(barrierXY.x, barrierXY.y - 1);
        if (id >= 0) {
          if (this.simulationService.simulationMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
            isNearParkingMeter = true;
          }
        }
        id = this.simulationService.simulationMap.getIdByPos(barrierXY.x + 1, barrierXY.y);
        if (id >= 0) {
          if (this.simulationService.simulationMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
            isNearParkingMeter = true;
          }
        }
        id = this.simulationService.simulationMap.getIdByPos(barrierXY.x, barrierXY.y + 1);
        if (id >= 0) {
          if (this.simulationService.simulationMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
            isNearParkingMeter = true;
          }
        }
        if (isNearParkingMeter) {
          this.parkingMeter.startBarrierCell = barriersArr[i];
        } else {
          this.parkingMeter.endBarrierCell = barriersArr[i];
        }
      }
    });
  }
}

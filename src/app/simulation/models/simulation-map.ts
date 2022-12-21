import { ParkingCell } from 'src/app/designer/models/parking-cell';
import { ParkingMap } from 'src/app/designer/models/parking-map';
import { ParkingState } from 'src/app/designer/models/parking-state';
import { ParkingMeter } from './ParkingSystem/parkingMeter';

export class SimulationMap extends ParkingMap {
  public startBarrierCell!: ParkingCell;
  public endBarrierCell!: ParkingCell;
  public parkingMeter!: ParkingMeter;

  constructor() {
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

    this.parkingMeter = new ParkingMeter(
      this,
      this.parkingCells.filter(
        (x) => x.template.state === ParkingState.ParkingMeter
      )[0]
    );

    this.parkingCells.forEach((value, id) => {
      if (value.template.state === ParkingState.Barrier) {
        let xy = this.atId(id);
        let isNearParkingMeter = false;
        if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.atXYid(xy.xPos - 1, xy.yPos)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.atXYid(xy.xPos, xy.yPos - 1)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.atXYid(xy.xPos + 1, xy.yPos)]) {
          isNearParkingMeter = true;
        } else if (this.parkingMeter.parkingMeterCell ===
          this.parkingCells[this.atXYid(xy.xPos, xy.yPos + 1)]) {
          isNearParkingMeter = true;
        }
        if (isNearParkingMeter)
            this.startBarrierCell = this.parkingCells[this.atXYid(xy.xPos,xy.yPos)];
        else
            this.endBarrierCell = this.parkingCells[this.atXYid(xy.xPos,xy.yPos)];
      }
    });
  }
}

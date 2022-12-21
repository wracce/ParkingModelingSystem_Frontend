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
        let xy = parkingMap.atId(id);
        let isNearParkingMeter = false;

        for (const i of [1, -1]) {
          for (const j of [1, -1]) {
            if (
              this.parkingMeter.parkingMeterCell ==
              this.parkingCells[this.atXYid(xy.x + i, xy.y + j)]
            )
              isNearParkingMeter = true;
          }
        }

        if (isNearParkingMeter)
            this.startBarrierCell = this.parkingCells[this.atXYid(xy.x,xy.y)];
        else(isNearParkingMeter)
            this.endBarrierCell = this.parkingCells[this.atXYid(xy.x,xy.y)];
      }
    });

    console.log(this.endBarrierCell,this.startBarrierCell,this.parkingMeter);
  }
}

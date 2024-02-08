import {ParkingCell} from "../../../designer/models/parking-cell";

export class ParkingPlace {
  constructor(
    public parkingCell: ParkingCell,
    public available: boolean,
  ) {
  }
}

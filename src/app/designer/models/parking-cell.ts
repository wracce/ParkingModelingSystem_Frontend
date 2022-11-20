import { ParkingTemplate } from './parking-template';

export class ParkingCell {
  constructor(public type: ParkingTemplate, public angle: number, public id: number) {}
}

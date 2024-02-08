import { ParkingTemplate } from './parking-template';

export class ParkingCell {
  constructor(public id: number, public template: ParkingTemplate, public angle: number) {}
}

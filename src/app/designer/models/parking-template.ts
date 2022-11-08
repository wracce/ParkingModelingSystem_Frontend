import { ParkingState } from './parking-state';

export class ParkingTemplate {
  constructor(
    public name: string,
    public src: any,
    public group: string,
    public state: ParkingState,
    public angle: number
  ) {}
}

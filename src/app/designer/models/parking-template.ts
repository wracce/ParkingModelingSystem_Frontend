import { ParkingState } from './parking-state';

export class ParkingTemplate {
  constructor(
    public name: string,
    public src: any,
    public state: ParkingState,
    public angle: number,
    public cols: number,
    public rows: number
  ) {}
}

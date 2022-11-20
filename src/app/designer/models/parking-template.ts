import { ParkingState } from './parking-state';

export class ParkingTemplate {
  constructor(
    public name: string,
    public src: any,
    public state: ParkingState,
    public cols: number,
    public rows: number
  ) {}
}

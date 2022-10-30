export class ParkingMap {
  constructor(
    public name: string = '',
    public cols: number = 0,
    public rows: number = 0,
    public directOfRoad: string = ''
  ) {}

  public getSize():number {
    return this.cols*this.rows;
  }
}

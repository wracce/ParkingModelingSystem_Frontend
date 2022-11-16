import { state } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { ParkingCell } from './parking-cell';
import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';

export class ParkingMap {
  private parkingCells!: ParkingCell[];

  constructor(
    public name: string = '',
    public cols: number = 0,
    public rows: number = 0,
    public directOfRoad: string = '',
    public widthOfRoad: number = 0
  ) {
    this.parkingCells = [];
  }

  public getCells(): ParkingCell[] {
    return this.parkingCells;
  }

  public getSize(): number {
    return this.cols * this.rows;
  }

  public getParkingCols(): number {
    if (
      this.directOfRoad.localeCompare('left') == 0 ||
      this.directOfRoad.localeCompare('right') == 0
    )
      return this.cols - 1;
    else return this.cols;
  }

  public getParkingRows(): number {
    if (
      this.directOfRoad.localeCompare('top') == 0 ||
      this.directOfRoad.localeCompare('bottom') == 0
    )
      return this.rows - 1;
    else return this.rows;
  }

  public configurateParking(form?: FormGroup) {
    if (!arguments.length) {
      // new parking
      // let m: number = this.rows;
      // let n: number = this.cols;

      let undefTemplate: ParkingTemplate = new ParkingTemplate(
        '',
        null,
        ParkingState.Undef,
        0, 1,1
      );
      let roadTemplate: ParkingTemplate = new ParkingTemplate(
        '',
        null,
        ParkingState.Road,
        0, 1,1
      );

      this.parkingCells.length = 0;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let templateType!: ParkingTemplate;
          if (
            (this.directOfRoad.localeCompare('left') == 0 && j == 0) ||
            (this.directOfRoad.localeCompare('right') == 0 &&
              j == this.cols - 1) ||
            (this.directOfRoad.localeCompare('top') == 0 && i == 0) ||
            (this.directOfRoad.localeCompare('bottom') == 0 &&
              i == this.rows - 1)
          )
            templateType = roadTemplate;
          else {
            templateType = undefTemplate;
          }
          this.parkingCells[i * this.cols + j] = new ParkingCell(
            templateType,
            this.cols*i+j,
          );
        }
      }
    } else {
      // already cretated parking

      // name changed?
      if (this.name.localeCompare(form?.value.name) != 0)
        this.name = form?.value.name;

      // cols or rows changed?
      if (
        this.getParkingCols() != form?.value.cols ||
        this.getParkingRows() != form?.value.rows
      ) {

        this.rows = form?.value.rows;
        this.cols = form?.value.cols;
        this.directOfRoad = form?.value.directOfRoad;
        if (
          this.directOfRoad.localeCompare('left') == 0 ||
          this.directOfRoad.localeCompare('right') == 0
        )
          this.cols += this.widthOfRoad;
        if (
          this.directOfRoad.localeCompare('top') == 0 ||
          this.directOfRoad.localeCompare('bottom') == 0
        )
          this.rows += this.widthOfRoad;
        this.configurateParking();
      } else if (this.directOfRoad != form?.value.directOfRoad) {
        let m: number = form?.value.rows;
        let n: number = form?.value.cols;
        if (
          form?.value.directOfRoad.localeCompare('left') == 0 ||
          form?.value.directOfRoad.localeCompare('right') == 0
        )
          n += this.widthOfRoad;
        if (
          form?.value.directOfRoad.localeCompare('top') == 0 ||
          form?.value.directOfRoad.localeCompare('bottom') == 0
        )
          m += this.widthOfRoad;

        let newParkingMap = new ParkingMap(
          form?.value.name,
          n,
          m,
          form?.value.directOfRoad,
          this.widthOfRoad
        );
        newParkingMap.configurateParking();
        // debugger;
        let clearParkingCells = this.getParkingCells();
        let i0 = newParkingMap.directOfRoad.localeCompare('top') == 0 ? 1 : 0;
        let j0 = newParkingMap.directOfRoad.localeCompare('left') == 0 ? 1 : 0;
        
        for (let i = i0; i < i0 + newParkingMap.getParkingRows() ; i++) {
          for (let j = j0; j < j0 + newParkingMap.getParkingCols() ; j++) {
            // debugger;
            newParkingMap.getCells()[i * n + j].type =
              clearParkingCells[(i - i0) * this.getParkingCols() + (j - j0)].type;
          }
        }

        this.cols = newParkingMap.cols;
        this.rows = newParkingMap.rows;
        this.directOfRoad = newParkingMap.directOfRoad;
        this.parkingCells.length = 0;
        this.parkingCells.push(...newParkingMap.getCells());
      }
    }
  }

  public getParkingCells(): ParkingCell[] {
    return this.parkingCells.filter(
      (cell) => cell.type.state !== ParkingState.Road
    );
  }

  public at(x:number,y:number):ParkingTemplate {
    return this.parkingCells[y*this.cols+x].type;
  }

  public configurateNeighbours(cell: ParkingCell) {
    for (let i = 1; i < cell.type.cols*cell.type.rows; i++) {
      this.parkingCells[cell.id+(i%cell.type.cols)+this.cols*(Math.floor(i/cell.type.cols))].type = new ParkingTemplate("",null,ParkingState.Undef,0,0,0);
      
    }
  }
}

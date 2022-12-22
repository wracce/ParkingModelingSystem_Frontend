import { state } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { ParkingCell } from './parking-cell';
import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';


export interface Coordinates {
  xPos: number;
  yPos: number;
}

export class ParkingMap {
  public parkingCells!: ParkingCell[];

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
    if (form === undefined) {
      // new parking
      // let m: number = this.rows;
      // let n: number = this.cols;

      let undefTemplate: ParkingTemplate = new ParkingTemplate(
        '',
        null,
        ParkingState.Undef,
        1,
        1
      );
      let roadTemplate: ParkingTemplate = new ParkingTemplate(
        '',
        null,
        ParkingState.Road,
        1,
        1
      );

      this.parkingCells.length = 0;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let templateType!: ParkingTemplate;
          let angle!: number;
          if (
            (this.directOfRoad.localeCompare('left') == 0 && j == 0) ||
            (this.directOfRoad.localeCompare('right') == 0 &&
              j == this.cols - 1) ||
            (this.directOfRoad.localeCompare('top') == 0 && i == 0) ||
            (this.directOfRoad.localeCompare('bottom') == 0 &&
              i == this.rows - 1)
          ) {
            templateType = roadTemplate;
            angle =
              this.directOfRoad.localeCompare('top') == 0 ||
              this.directOfRoad.localeCompare('bottom') == 0
                ? 90
                : 0;
          } else {
            templateType = undefTemplate;
          }
          this.parkingCells[i * this.cols + j] = new ParkingCell(
            this.cols * i + j,
            templateType,
            angle
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

        for (let i = i0; i < i0 + newParkingMap.getParkingRows(); i++) {
          for (let j = j0; j < j0 + newParkingMap.getParkingCols(); j++) {
            // debugger;
            newParkingMap.getCells()[i * n + j].template =
              clearParkingCells[
                (i - i0) * this.getParkingCols() + (j - j0)
              ].template;
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
      (cell) => cell.template.state !== ParkingState.Road
    );
  }


  public atId(id: number): {x:number, y:number} {
    let x;
    let y;
    if (id <0 || id>=this.getSize()) {
      x = -1;
      y = -1;
    } else {
      x = id % this.cols;
      y = Math.floor(id / this.cols);

    }
    return {x:x,y:y};
  }

  public atXYid(x: number,y:number): number {
    if (x<0 || x>=this.cols || y<0|| y>=this.rows )
      return -1;
    return y*this.cols + x;
  }

  public getCellPositions(id: number, template?: ParkingTemplate): number[] {
    let arr: number[] = [];

    if (id < 0) return arr;

    if (template === undefined) {
      let index: number = this.parkingCells[id].id;
      arr.push(
        ...this.getCellPositions(index, this.parkingCells[index].template)
      );
      return arr;
    }

    for (let i = 0; i < template.cols * template.rows; i++) {
      arr.push(
        id + (i % template.cols) + this.cols * Math.floor(i / template.cols)
      );
    }

    // проверка на выход заграницы
    let arrHeight = new Set<number>();
    let arrWidth = new Set<number>();
    for (const index of arr) {
      if (
        this.parkingCells[id].template.state == ParkingState.Road ||
        index >= this.getSize()
      ) {
        arr.length = 0;
        return arr;
      }
      arrHeight.add(Math.floor(index / this.cols));
      arrWidth.add(index % this.cols);
    }
    if (arrHeight.size != template.rows || arrWidth.size != template.cols)
      arr.length = 0;

    return arr;
  }

  public deleteCell(id: number): ParkingTemplate {
    let arr: number[] = this.getCellPositions(id);
    // TODO баг связанный с изменением направления дороги, и перемещением ячейки в нижний левый угол
    let template: ParkingTemplate = this.parkingCells[arr[0]].template;
    for (const index of arr) {
      this.parkingCells[index] = new ParkingCell(
        index,
        new ParkingTemplate('', null, ParkingState.Undef, 1, 1),
        0
      );
    }

    return template;
  }

  public setCell(id: number, template: ParkingTemplate, angle?: number) {
    console.log('angle ' + angle);

    if (id < 0) return;

    if (angle == undefined) {
      console.log(1);

      angle = 0;
    }
    let positions: number[] = this.getCellPositions(id, template);
    for (const index of positions) {
      this.deleteCell(index);
    }

    for (const index of positions) {
      this.parkingCells[index] = new ParkingCell(
        id,
        index == id
          ? template
          : new ParkingTemplate('', null, ParkingState.Undef, 0, 0),
        angle
      );
    }
  }

  public rotateCell(id: number) {
    let cell: ParkingCell = this.parkingCells[id];
    let size: number = cell.template.cols * cell.template.rows;

    if (size <= 0) return;

    cell.angle += size == 1 ? 90 : 180;

    if (cell.angle >= 360) cell.angle -= 360;
  }
}

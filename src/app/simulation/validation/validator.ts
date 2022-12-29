import {ParkingState} from "../../designer/models/parking-state";
import {MatDialog} from "@angular/material/dialog";
import {ValidatorDialogComponent} from "./validator-dialog/validator-dialog.component";
import {ParkingMap} from "../../designer/models/parking-map";
import {ParkingCell} from "../../designer/models/parking-cell";
import {RouteCar} from "../models/route-car";

export class Validator {
  public message = "";
  private parkingMeters: ParkingCell[];
  private startBarrierCell!: ParkingCell | undefined;
  private endBarrierCell!: ParkingCell | undefined;
  private barriersArr: ParkingCell[];

  constructor(
    private parkingMap: ParkingMap,
    private dialog?: MatDialog
  ) {
  }

  public validate(): boolean {
    let errorIndex: number = 0;
    if (this.isBarriersNumberInvalid()) {
      this.message = "Необходимо два шлагбаума.\n";
      errorIndex++;
    } else if (this.isBarrierNotNearParkingMeter()) {
      this.message = "Один из шлагбаумов должен быть рядом с паркоматом.\n";
      errorIndex++;
    } else if (this.isParkingMetersNumberInvalid()) {
      this.message = "Необходим один паркомат.\n";
      errorIndex++;
    } else if (this.isParkingPlacesNotExist()) {
      this.message = "Ошибка в расстановке парковочных мест.";
      errorIndex++;
    } else if (this.isBarriersNotNearRoad()) {
      this.message = "Шлагбаумы должны быть рядом с шоссе.\n";
      errorIndex++;
    } else if (this.isParkingMeterNotNearRoad()) {
      this.message = "Паркомат должен быть рядом с шоссе.\n";
      errorIndex++;
    }
    if (errorIndex > 0) {
      //this.showError(message);
      return false;
    }
    return true;
  }

  private showError(message: string[]) {
    this.dialog?.open(ValidatorDialogComponent, {
      data: {
        message: message
      }
    });
  }

  private isParkingPlacesNotExist(): boolean {
    let parkingPlaces: ParkingCell[] = this.parkingMap.parkingCells.filter((val) =>
      val.template.state == ParkingState.Park);
    if (parkingPlaces.length != 0) {
      return this.isPathNotValid(parkingPlaces);
    }
    return true;
  }

  private isPathNotValid(parkingPlaces: ParkingCell[]): boolean {
    let sourceCell: ParkingCell = this.calcSourceCell(this.parkingMap.directOfRoad);
    let done: boolean = false;
    parkingPlaces.forEach((place) => {
      if (RouteCar.getPathToDest(this.parkingMap, sourceCell, place, this.startBarrierCell!).length === 0) {
        done = true;
      }
    });
    return done;
  }

  private calcSourceCell(direct: string): ParkingCell {
    let sourceCellId!: number;
    if (direct === 'left') {
      sourceCellId = this.parkingMap.getIdByPos(0, this.parkingMap.rows - 1);
    } else if (direct === 'top') {
      sourceCellId = this.parkingMap.getIdByPos(0, 0);
    } else if (direct === 'right') {
      sourceCellId = this.parkingMap.getIdByPos(this.parkingMap.cols - 1, 0);
    } else if (direct === 'bottom') {
      sourceCellId = this.parkingMap.getIdByPos(this.parkingMap.cols - 1, this.parkingMap.rows - 1);
    }
    return this.parkingMap.parkingCells[sourceCellId];
  }

  private isParkingMetersNumberInvalid(): boolean {
    this.parkingMeters = this.parkingMap.parkingCells.filter((val) =>
      val.template.state == ParkingState.ParkingMeter);
    return this.parkingMeters.length !== 1;
  }

  private isBarriersNumberInvalid(): boolean {
    this.barriersArr = this.parkingMap.parkingCells.filter((val) =>
      val.template.state == ParkingState.Barrier)
    return this.barriersArr.length !== 2;
  }

  private isBarrierNotNearParkingMeter(): boolean {
    this.startBarrierCell = undefined;
    this.endBarrierCell = undefined;
    for (let i = 0; i < this.barriersArr.length; i++) {
      let isNearParkingMeter = false;
      let barrierXY = this.parkingMap.getPosById(this.barriersArr[i].id);
      let id: number = this.parkingMap.getIdByPos(barrierXY.x - 1, barrierXY.y);
      if (id >= 0) {
        if (this.parkingMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
          isNearParkingMeter = true;
        }
      }
      id = this.parkingMap.getIdByPos(barrierXY.x, barrierXY.y - 1);
      if (id >= 0) {
        if (this.parkingMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
          isNearParkingMeter = true;
        }
      }
      id = this.parkingMap.getIdByPos(barrierXY.x + 1, barrierXY.y);
      if (id >= 0) {
        if (this.parkingMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
          isNearParkingMeter = true;
        }
      }
      id = this.parkingMap.getIdByPos(barrierXY.x, barrierXY.y + 1);
      if (id >= 0) {
        if (this.parkingMap.parkingCells[id].template.state === ParkingState.ParkingMeter) {
          isNearParkingMeter = true;
        }
      }
      if (isNearParkingMeter) {
        this.startBarrierCell = this.barriersArr[i];
      } else {
        this.endBarrierCell = this.barriersArr[i];
      }
    }
    return this.startBarrierCell == undefined;
  }

  private isBarriersNotNearRoad(): boolean {
    if (this.isBarrierNotNearRoad(this.barriersArr[0].id) || this.isBarrierNotNearRoad(this.barriersArr[1].id)) {
      return true;
    }
    return false;
    // let done = true;
    // this.barriersArr.forEach((val, index, arr) => {
    //   let isNearParkingMeter = false;
    //   let xy = this.parkingMap.getPosById(val.id);
    //   if (this.checkForState(xy.x - 1, xy.y, ParkingState.Road)) {
    //     isNearParkingMeter = true;
    //   }
    //   if (this.checkForState(xy.x, xy.y - 1, ParkingState.Road)) {
    //     isNearParkingMeter = true;
    //   }
    //   if (this.checkForState(xy.x + 1, xy.y, ParkingState.Road)) {
    //     isNearParkingMeter = true;
    //   }
    //   if (this.checkForState(xy.x, xy.y + 1, ParkingState.Road)) {
    //     isNearParkingMeter = true;
    //   }
    //   done = done && isNearParkingMeter;
    // });
    // return !done
  }

  isBarrierNotNearRoad(id: number): boolean {
    let done: boolean = true;
    let barrierXY = this.parkingMap.getPosById(id);
    let roadId: number = this.parkingMap.getIdByPos(barrierXY.x - 1, barrierXY.y);
    if (roadId >= 0) {
      if (this.parkingMap.parkingCells[roadId].template.state === ParkingState.Road) {
        done = false;
      }
    }
    roadId = this.parkingMap.getIdByPos(barrierXY.x, barrierXY.y - 1);
    if (roadId >= 0) {
      if (this.parkingMap.parkingCells[roadId].template.state === ParkingState.Road) {
        done = false;
      }
    }
    roadId = this.parkingMap.getIdByPos(barrierXY.x + 1, barrierXY.y);
    if (roadId >= 0) {
      if (this.parkingMap.parkingCells[roadId].template.state === ParkingState.Road) {
        done = false;
      }
    }
    roadId = this.parkingMap.getIdByPos(barrierXY.x, barrierXY.y + 1);
    if (roadId >= 0) {
      if (this.parkingMap.parkingCells[roadId].template.state === ParkingState.Road) {
        done = false;
      }
    }
    console.log(id, done)
    return done
  }

  private checkForState(x: number, y: number, state: ParkingState): boolean {
    let id = this.parkingMap.getIdByPos(x, y);
    if (id < 0)
      return true;
    return this.parkingMap.parkingCells[id].template.state === state;
  }


  private isParkingMeterNotNearRoad() {
    let pmXY = this.parkingMap.getPosById(this.parkingMeters[0].id);
    let id: number = this.parkingMap.getIdByPos(pmXY.x - 1, pmXY.y);
    let done = true;
    if (id >= 0) {
      if (this.parkingMap.parkingCells[id].template.state === ParkingState.Road) {
        done = false;
      }
    }
    id = this.parkingMap.getIdByPos(pmXY.x, pmXY.y - 1);
    if (id >= 0) {
      if (this.parkingMap.parkingCells[id].template.state === ParkingState.Road) {
        done = false;
      }
    }
    id = this.parkingMap.getIdByPos(pmXY.x + 1, pmXY.y);
    if (id >= 0) {
      if (this.parkingMap.parkingCells[id].template.state === ParkingState.Road) {
        done = false;
      }
    }
    id = this.parkingMap.getIdByPos(pmXY.x, pmXY.y + 1);
    if (id >= 0) {
      if (this.parkingMap.parkingCells[id].template.state === ParkingState.Road) {
        done = false;
      }
    }
    return done;
  }
}

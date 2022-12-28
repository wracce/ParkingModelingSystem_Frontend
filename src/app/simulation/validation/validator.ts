import {ParkingState} from "../../designer/models/parking-state";
import {MatDialog} from "@angular/material/dialog";
import {ValidatorDialogComponent} from "./validator-dialog/validator-dialog.component";
import {ParkingMap} from "../../designer/models/parking-map";
import {ParkingCell} from "../../designer/models/parking-cell";

export class Validator {
  private parkingMeters: ParkingCell[];
  private startBarrierCell!: ParkingCell|undefined;
  private endBarrierCell!: ParkingCell|undefined;
  private barriersArr:ParkingCell[];

  constructor(
    private parkingMap: ParkingMap,
    private dialog: MatDialog
  ) {
  }

  public validate(): boolean {
    let message: string[] = [];
    let errorIndex: number = 0;
      if (this.isParkingPlacesNotExist()) {
      message.push(". Ошибка в расстановке парковочных мест.");
      errorIndex++;
    } else
    if (this.isParkingMetersNumberInvalid()) {
      message.push(". Необходим один паркомат.\n");
      errorIndex++;
    } else
    if (this.isBarriersNumberInvalid()) {
      message.push(". Необходимо два шлагбаума.\n");
      errorIndex++;
    } else
    if (this.isBarrierNotNearParkingMeter()) {
      message.push(". Один из шлагбаумов должен быть рядом с паркоматом.\n");
      errorIndex++;
    } else
    if (this.isBarriersNotNearRoad()) {
      message.push(". Шлагбаумы должны быть рядом с шоссе.\n");
      errorIndex++;
    } else
    if (this.isParkingMeterNotNearRoad()) {
      message.push(". Паркоматы должны быть рядом с шоссе.\n");
      errorIndex++;
    }
    if (errorIndex > 0) {
      this.showError(message);
      return false;
    }
    return true;
  }

  private showError(message: string[]) {
    this.dialog.open(ValidatorDialogComponent, {
      data: {
        message: message
      }
    });
  }

  private isParkingPlacesNotExist(): boolean {
    return this.parkingMap.parkingCells.filter((val) =>
      val.template.state == ParkingState.Park)
      .length === 0;
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
    this.barriersArr.forEach((val,index,arr) => {
        let isNearParkingMeter = false;
        let xy = this.parkingMap.getPosById(val.id);
        if (this.checkForState(xy.x - 1, xy.y, ParkingState.ParkingMeter)) {
          isNearParkingMeter = true;
        }
        if (this.checkForState(xy.x, xy.y - 1, ParkingState.ParkingMeter)) {
          isNearParkingMeter = true;
        }
        if (this.checkForState(xy.x + 1, xy.y, ParkingState.ParkingMeter)) {
          isNearParkingMeter = true;
        }
        if (this.checkForState(xy.x, xy.y + 1, ParkingState.ParkingMeter)) {
          isNearParkingMeter = true;
        }
        if (isNearParkingMeter) {
          this.startBarrierCell = val;
        } else {
          this.endBarrierCell = val;
        }
    });
    console.log(this.startBarrierCell)
    return this.startBarrierCell == undefined;
  }

  private isBarriersNotNearRoad(): boolean {
    let done = true;
    this.barriersArr.forEach((val,index,arr) => {
      let isNearParkingMeter = false;
      let xy = this.parkingMap.getPosById(val.id);
      if (this.checkForState(xy.x - 1, xy.y, ParkingState.Road)) {
        isNearParkingMeter = true;
      }
      if (this.checkForState(xy.x, xy.y - 1, ParkingState.Road)) {
        isNearParkingMeter = true;
      }
      if (this.checkForState(xy.x + 1, xy.y, ParkingState.Road)) {
        isNearParkingMeter = true;
      }
      if (this.checkForState(xy.x, xy.y + 1, ParkingState.Road)) {
        isNearParkingMeter = true;
      }
      done = done&&isNearParkingMeter;
    });
    return !done
  }

  private checkForState(x: number, y: number, state: ParkingState): boolean {
    let id = this.parkingMap.getIdByPos(x, y);
    if (id < 0)
      return true;
    return this.parkingMap.parkingCells[id].template.state === state;
  }


  private isParkingMeterNotNearRoad() {
    if (this.parkingMeters.length === 0) return true;
    let parkingMeterCoords = this.parkingMap.getPosById(this.parkingMeters[0].id);
    return !(this.checkForState(parkingMeterCoords.x - 1, parkingMeterCoords.y, ParkingState.Road)
      || this.checkForState(parkingMeterCoords.x, parkingMeterCoords.y - 1, ParkingState.Road)
      || this.checkForState(parkingMeterCoords.x + 1, parkingMeterCoords.y, ParkingState.Road)
      || this.checkForState(parkingMeterCoords.x, parkingMeterCoords.y + 1, ParkingState.Road));

  }
}

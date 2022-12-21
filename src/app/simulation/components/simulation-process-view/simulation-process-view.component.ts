import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { timeInterval } from "rxjs";
import { ParkingCell } from "src/app/designer/models/parking-cell";
import { ParkingMap } from "src/app/designer/models/parking-map";
import { ParkingState } from "src/app/designer/models/parking-state";
import { ParkingTemplateGroup } from "src/app/designer/models/parking-template-group";
import { DesignerService } from "src/app/designer/services/designer.service";
import { Car } from "../../models/car";
import { SimulationMap } from "../../models/simulation-map";
import { SimulationService } from "../../services/simulation.service";

@Component({
  selector: 'app-simulation-process-view',
  templateUrl: './simulation-process-view.component.html',
  styleUrls:  ['./simulation-process-view.component.scss']
})
export class SimulationProcessViewComponent implements OnInit {
  
  @ViewChild('board', { static: false })
  board!: ElementRef;

  zoomScaleProc = 15; //%
  sizePadding: number = 20; //px
  minSizeCell: number = 16; //px
  maxSizeCell: number = 256; //px

  marginTop: number = 0; //px
  marginLeft: number = 0; //px
  h: number = 0;
  w: number = 0;
  sizeCell: number = this.minSizeCell;
  sizeCellBase: number = this.sizeCell;

  simulationMap!: SimulationMap;
  cells!: ParkingCell[];
  cars!: Car[];


  constructor(public simulationService: SimulationService) {
    this.simulationMap = simulationService.simulationMap;
    this.cars = simulationService.simulationEngine.cars;
  }

  ngOnInit(): void {
    this.cells = this.simulationMap.getCells();
    this.cars = this.simulationService.simulationEngine.cars;
  }

  public zoomIn(): void {
    this.sizeCell *= 1 + this.zoomScaleProc / 100;

    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.simulationMap.rows)
      this.marginTop = 0;
  }

  public zoomFree(): void {
    this.h = this.board.nativeElement.clientHeight - this.sizePadding * 2;
    this.w = this.board.nativeElement.clientWidth - this.sizePadding * 2;

    this.sizeCell = this.sizeCellBase =
      this.w / this.simulationMap.cols > this.h / this.simulationMap.rows
        ? this.h / this.simulationMap.rows
        : this.w / this.simulationMap.cols;

    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.simulationMap.rows)
      this.marginTop = 0;
  }

  public zoomOut(): void {
    this.sizeCell *= 1 - this.zoomScaleProc / 100;
    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.simulationMap.rows)
      this.marginTop = 0;

    console.log(this.cars);
    
  }

  public isRoad(cell: ParkingCell): boolean {
    return cell.template.state === ParkingState.Road;
  }
}

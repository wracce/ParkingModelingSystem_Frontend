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
import {BoardView} from "../../models/board-view";

@Component({
  selector: 'app-simulation-process-view',
  templateUrl: './simulation-process-view.component.html',
  styleUrls:  ['./simulation-process-view.component.scss']
})
export class SimulationProcessViewComponent implements OnInit {
 // public  Math:Math;
  @ViewChild('board', { static: false })
  board!: ElementRef;

  zoomScaleProc = 15; //%
  sizePadding: number = 20; //px
  minSizeCell: number = 16; //px
  maxSizeCell: number = 256; //px

  marginTop: number = 0; //px
  marginLeft: number = 0; //px
  sizeCellBase!: number;

  simulationMap!: SimulationMap;
  cells!: ParkingCell[];
  cars!: Car[];

  boardView!:BoardView;


  constructor(public simulationService: SimulationService) {
    this.simulationMap = simulationService.simulationMap;
    this.cars = simulationService.simulationEngine.cars;
    this.boardView = simulationService.boardView;
    this.boardView.cellSize = this.minSizeCell;
    this.sizeCellBase = this.minSizeCell;

  }

  ngOnInit(): void {
    this.cells = this.simulationMap.getCells();
    this.cars = this.simulationService.simulationEngine.cars;
  }

  public zoomIn(): void {
    this.boardView.cellSize *= 1 + this.zoomScaleProc / 100;

    if (this.boardView.cellSize < this.minSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.minSizeCell;
    if (this.boardView.cellSize > this.maxSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.boardView.w - this.boardView.cellSize * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.boardView.h - this.boardView.cellSize * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.boardView.w + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.boardView.h + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.rows)
      this.marginTop = 0;
  }

  public zoomFree(): void {
    this.boardView.h = this.board.nativeElement.clientHeight - this.sizePadding * 2;
    this.boardView.w = this.board.nativeElement.clientWidth - this.sizePadding * 2;

    this.boardView.cellSize = this.sizeCellBase =
      this.boardView.w / this.simulationMap.cols > this.boardView.h / this.simulationMap.rows
        ? this.boardView.h / this.simulationMap.rows
        : this.boardView.w / this.simulationMap.cols;

    if (this.boardView.cellSize < this.minSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.minSizeCell;
    if (this.boardView.cellSize > this.maxSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.boardView.w - this.boardView.cellSize * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.boardView.h - this.boardView.cellSize * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.boardView.w + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.boardView.h + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.rows)
      this.marginTop = 0;
  }

  public zoomOut(): void {
    this.boardView.cellSize *= 1 - this.zoomScaleProc / 100;
    if (this.boardView.cellSize < this.minSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.minSizeCell;
    if (this.boardView.cellSize > this.maxSizeCell)
      this.boardView.cellSize = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.boardView.w - this.boardView.cellSize * this.simulationMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.boardView.h - this.boardView.cellSize * this.simulationMap.rows) / 2 + this.sizePadding;
    if (this.boardView.w + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.cols)
      this.marginLeft = 0;
    if (this.boardView.h + 2 * this.sizePadding < this.boardView.cellSize * this.simulationMap.rows)
      this.marginTop = 0;

    console.log(this.cars);

  }

  public isRoad(cell: ParkingCell): boolean {
    return cell.template.state === ParkingState.Road;
  }
}

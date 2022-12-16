import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ParkingCell } from "src/app/designer/models/parking-cell";
import { ParkingMap } from "src/app/designer/models/parking-map";
import { ParkingState } from "src/app/designer/models/parking-state";
import { ParkingTemplateGroup } from "src/app/designer/models/parking-template-group";
import { DesignerService } from "src/app/designer/services/designer.service";

@Component({
  selector: 'app-simulation-process',
  templateUrl: './simulation-process.component.html',
  styleUrls: ['./simulation-process.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationProcessComponent implements OnInit {
  
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

  parkingMap!: ParkingMap;
  types!: ParkingTemplateGroup;
  cells: ParkingCell[] = [];
  nameOfIdList: string = '';
  valueListConnectedTo: string[] = [];

  selectedCells!: number[];

  idMenu!: number;
  buffer?: ParkingCell;
  isCut!: boolean;

  constructor(public designerService: DesignerService) {
    this.isCut = false;
    this.idMenu = -1;
    this.parkingMap = designerService.getParkingMap();
    this.selectedCells = designerService.getSelectedCells();
  }

  ngOnInit(): void {
    this.types = this.designerService.getTypes();
    this.cells = this.parkingMap.getCells();
    this.nameOfIdList = this.designerService.getNameOfGridList();
    this.valueListConnectedTo = this.designerService.getLinksToParkingCells();
  }

  public setIndexOver(id: number) {
    this.designerService.indexOver = id;
    // console.log(this.designerService.indexOver);
  }

  public zoomIn(): void {
    this.sizeCell *= 1 + this.zoomScaleProc / 100;

    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.parkingMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.parkingMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.parkingMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.parkingMap.rows)
      this.marginTop = 0;
  }

  public zoomFree(): void {
    this.h = this.board.nativeElement.clientHeight - this.sizePadding * 2;
    this.w = this.board.nativeElement.clientWidth - this.sizePadding * 2;

    this.sizeCell = this.sizeCellBase =
      this.w / this.parkingMap.cols > this.h / this.parkingMap.rows
        ? this.h / this.parkingMap.rows
        : this.w / this.parkingMap.cols;

    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.parkingMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.parkingMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.parkingMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.parkingMap.rows)
      this.marginTop = 0;
  }

  public zoomOut(): void {
    this.sizeCell *= 1 - this.zoomScaleProc / 100;
    if (this.sizeCell < this.minSizeCell)
      this.sizeCell = this.sizeCellBase = this.minSizeCell;
    if (this.sizeCell > this.maxSizeCell)
      this.sizeCell = this.sizeCellBase = this.maxSizeCell;

    this.marginLeft =
      (this.w - this.sizeCell * this.parkingMap.cols) / 2 + this.sizePadding;
    this.marginTop =
      (this.h - this.sizeCell * this.parkingMap.rows) / 2 + this.sizePadding;
    if (this.w + 2 * this.sizePadding < this.sizeCell * this.parkingMap.cols)
      this.marginLeft = 0;
    if (this.h + 2 * this.sizePadding < this.sizeCell * this.parkingMap.rows)
      this.marginTop = 0;
  }

  public isRoad(cell: ParkingCell): boolean {
    return cell.template.state === ParkingState.Road;
  }

  public isParking(id:number): boolean {
    return this.designerService.getParkingMap().at(id).template.state === ParkingState.Park;
  }


  public isCellSetable(id: number): boolean {
    return (
      this.designerService.getParkingMap().at(id).template.state !==
      ParkingState.Undef
    );
  }

  public isBufferEmpty(): boolean {
    return this.buffer == null;
  }

  public isOneBoardCell(cell: ParkingCell): boolean {
    return cell.template.cols * cell.template.rows == 1 && !this.isRoad(cell);
  }

  public isMoreBoardCell(cell: ParkingCell): boolean {
    return cell.template.cols * cell.template.rows > 1;
  }

  public deleteCell(id: number) {
    this.designerService.getParkingMap().deleteCell(id);
  }

  public copyCell(id: number) {
    if (this.isCut && this.buffer !== undefined) {
      this.pasteCell(this.buffer?.id);
      console.log(3);
    }
    let cell: ParkingCell = this.designerService.getParkingMap().at(id);
    this.buffer = new ParkingCell(cell.id, cell.template, cell.angle);
  }

  public cutCell(id: number) {
    this.copyCell(id);
    this.deleteCell(id);
    this.isCut = true;
  }

  public pasteCell(id: number) {
    if (this.buffer === undefined) return;

    this.designerService
      .getParkingMap()
      .setCell(id, this.buffer.template, this.buffer?.angle);
    if (this.isCut) this.isCut = false;
  }

  public turnCell(id: number) {
    if (
      this.designerService.getParkingMap().at(id).template.state !==
      ParkingState.Park
    )
      this.designerService.getParkingMap().rotateCell(id);
  }

  
}

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  // ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DesignerService } from '../../services/designer.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ParkingTemplate } from '../../models/parking-template';
import { ParkingCell } from '../../models/parking-cell';
import { ParkingMap } from '../../models/parking-map';
import { ParkingTemplateGroup } from '../../models/parking-template-group';
import { ParkingState } from '../../models/parking-state';

@Component({
  selector: 'app-designer-parking',
  templateUrl: './designer-parking.component.html',
  styleUrls: ['./designer-parking.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignerParkingComponent implements OnInit {
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
  indexOver: number = -1;
  types!: ParkingTemplateGroup;
  cells: ParkingCell[] = [];
  nameOfIdList: string = '';
  valueListConnectedTo: string[] = [];

  constructor(private designerService: DesignerService) {
    this.parkingMap = designerService.getParkingMap();
  }

  ngOnInit(): void {
    this.types = this.designerService.getTypes();
    this.cells = this.parkingMap.getCells();
    this.nameOfIdList = this.designerService.getNameOfGridList();
    // this.valueListConnectedTo.push(this.designerService());
  }

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
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

  public isRoad(cell:ParkingCell):boolean {
    return cell.type.state === ParkingState.Road;
  }
}

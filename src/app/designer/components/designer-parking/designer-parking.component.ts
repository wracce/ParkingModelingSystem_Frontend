import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DesignerService } from '../../services/designer.service';
import { fromEvent, Observable, Subscription } from "rxjs";
import { ParkingTemplate } from '../../models/parking-template';
import { ParkingCell } from '../../models/parking-cell';
import { ParkingMap } from '../../models/parking-map';

@Component({
  selector: 'app-designer-parking',
  templateUrl: './designer-parking.component.html',
  styleUrls: ['./designer-parking.component.scss']
})
export class DesignerParkingComponent implements OnInit {
  
  @ViewChild("board", {static: false})
  board: ElementRef|undefined;
  @ViewChild("grid", {static: false})
  grid: ElementRef|undefined;

  parkingMap:ParkingMap = new ParkingMap();
  indexOver: number = -1;
  types:ParkingTemplate[] = [];
  cellSize:number = 0;
  cells:ParkingCell[] = [];
  nameOfIdList:string ="";
  valueListConnectedTo: string[] =[];

  constructor(private designerService:DesignerService) {
    this.parkingMap = designerService.getParkingMap();
  }

  resizeObservable$: Observable<Event> = new Observable<Event>();
  resizeSubscription$: Subscription = new Subscription();
    

  ngOnInit(): void {
    
    this.types = this.designerService.getTypes();
    this.cells = this.designerService.getCells();
    this.nameOfIdList = this.designerService.getNameOfGridList();
    this.valueListConnectedTo.push(this.designerService.getNameOfObjsList());

    // this.resizeObservable$ = fromEvent(window, 'resize')
    // this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => this.resize())
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
}

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
  }

  resize() {
    maxWidth:Number = this.board?.nativeElement.offsetWidth;
    maxHeight:Number = this.board?.nativeElement.offsetHeigth;
    // this.cellSize = Math.min([maxWidth, maxHeight])
  }
}

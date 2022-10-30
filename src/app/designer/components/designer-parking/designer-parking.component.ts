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
  board!: ElementRef;
  @ViewChild("grid", {static: false})
  grid!: ElementRef;

  scaleZoom:number = 1;
  scaleZoomBase:number = 1;
  translateX:number = 0;
  translateY:number = 0;

  parkingMap:ParkingMap = new ParkingMap();
  indexOver: number = -1;
  types:ParkingTemplate[] = [];
  cells:ParkingCell[] = [];
  nameOfIdList:string ="";
  valueListConnectedTo: string[] =[];

  constructor(private designerService:DesignerService) {
    this.parkingMap = designerService.getParkingMap();
  }

  ngOnInit(): void {
    
    this.types = this.designerService.getTypes();
    this.cells = this.designerService.getCells();
    this.nameOfIdList = this.designerService.getNameOfGridList();
    this.valueListConnectedTo.push(this.designerService.getNameOfObjsList());

    // this.resizeObservable$ = fromEvent(window, 'resize')
    // this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => this.resize())
  }

  ngAfterViewInit(){
    // this.zoomFree();
  }

  drop(event: CdkDragDrop<any>) {
    this.designerService.drop(event);
  }

  public zoomIn():void {
    this.scaleZoom += 0.2;

    
  }

  public zoomFree():void {
    let h:number =this.board.nativeElement.clientHeight;
    let w:number =this.board.nativeElement.clientWidth;
    let x:number = this.parkingMap.cols*64;
    
    if (w>h) {
      this.scaleZoomBase = this.scaleZoom = h/x;
      this.translateX = (w-x*this.scaleZoom)/2;
      this.translateY = 0;
    } else {
      this.scaleZoomBase = this.scaleZoom = w/x;
      this.translateX = 0;
      this.translateY = (h-x*this.scaleZoom)/2;
    }
    // this.board.nativeElement.scrollTop = (this.board.nativeElement.offsetWidth - this.board.nativeElement.offsetHeight)/2;
  }
  public zoomOut():void {
    this.scaleZoom -= 0.2;
  }
}

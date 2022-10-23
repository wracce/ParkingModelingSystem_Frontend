import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Cell } from '../cell';
import { CellType } from '../cell-type';
import { DesignerService } from '../designer.service';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-park-designer',
  templateUrl: './park-designer.component.html',
  styleUrls: ['./park-designer.component.scss']
})
export class ParkDesignerComponent implements OnInit {
  
  @ViewChild("board", {static: false})
  board: ElementRef|undefined;
  @ViewChild("grid", {static: false})
  grid: ElementRef|undefined;

  indexOver: number = -1;
  types:CellType[] = [];
  cols:number =0;
  cellSize:number = 0;
  cells:Cell[] = [];
  nameOfIdList:string ="";
  valueListConnectedTo: string[] =[];

  constructor(private designerService:DesignerService) {}

  resizeObservable$: Observable<Event> = new Observable<Event>();
  resizeSubscription$: Subscription = new Subscription();
    

  ngOnInit(): void {
    this.cols = Math.sqrt(this.designerService.getLen());
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

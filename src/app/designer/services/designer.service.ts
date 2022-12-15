import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParkingCell } from '../models/parking-cell';
import { ParkingMap } from '../models/parking-map';
import { ParkingState } from '../models/parking-state';
import { ParkingTemplate } from '../models/parking-template';
import { ParkingTemplateGroup } from '../models/parking-template-group';

@Injectable({
  providedIn: 'root',
})
export class DesignerService {
  public indexOver!: number;
  public deltaOver!:number;
  public selectedCells!: number[];
  public isDragging!:boolean;

  private linkOfParkingTemplate!: string;
  private linksToParkingCells!: string[];
  private linkOfParkingCell!: string;
  
  private parkingTemplateGroup!: ParkingTemplateGroup;

  private parkingMap!: ParkingMap;
  private setupParkingForm!: FormGroup;

  constructor() {
    this.indexOver = -1;
    this.deltaOver = -2;
    this.isDragging = false;
    this.selectedCells = [];
    this.linksToParkingCells = [];
    this.parkingMap = new ParkingMap('', 6, 6, 'top', 1);
    this.linkOfParkingCell = 'designerCellList';
    this.linkOfParkingTemplate = 'designerObjsList';
    this.parkingTemplateGroup = new ParkingTemplateGroup();
    this.setupParkingForm = new FormGroup({
      name: new FormControl(this.parkingMap.name),
      cols: new FormControl(this.parkingMap.cols),
      rows: new FormControl(this.parkingMap.rows),
      directOfRoad: new FormControl(this.parkingMap.directOfRoad),
    });
    this.parkingMap.configurateParking();
  }

  public getIndexOver(): Number {
    return this.indexOver;
  }

  public getSelectedCells(): number[] {
    return this.selectedCells;
  }

  public getParkingMap(): ParkingMap {
    return this.parkingMap;
  }
  public setParkingMap(parkingMap:ParkingMap):void {
    this.parkingMap = parkingMap;
  }
  public getTypes(): ParkingTemplateGroup {
    return this.parkingTemplateGroup;
  }

  public getNameOfGridList(): string {
    return this.linkOfParkingCell;
  }

  public getNameOfObjsList(): string {
    return this.linkOfParkingTemplate;
  }

  public getSetupParkingForm(): FormGroup {
    return this.setupParkingForm;
  }

  public getLinksToParkingCells(): string[] {
    return this.linksToParkingCells;
  }

  public drop(event: CdkDragDrop<any>) {
    this.isDragging = false;
    
    if (event.previousContainer != event.container) {
      if (event.container.data instanceof ParkingCell) {
        //on board
        if (event.previousContainer.data instanceof ParkingTemplate) {
          // from side to board
          this.parkingMap.setCell(this.indexOver, event.previousContainer.data);
          // event.container.data.type = event.previousContainer.data;
        } else {
          // from board to board
          // event.container.data.type = event.previousContainer.data.type;
          let oldDemplate:ParkingTemplate = event.previousContainer.data.template;
          let oldAngle:number = event.previousContainer.data.angle;
          this.parkingMap.deleteCell(event.previousContainer.data.id);
          this.parkingMap.setCell(this.indexOver-(this.deltaOver<0?0:this.deltaOver), oldDemplate, oldAngle);
        }
      }
    }
    this.selectedCells.length = 0;
    this.deltaOver = -2;
  }

  public move(event: CdkDragMove<any>) {
    this.isDragging = true;
    
    let cell: ParkingCell;
    if (event.source.dropContainer.data instanceof ParkingCell){
      cell = event.source.dropContainer.data;
      console.log(cell.id,this.indexOver);
      // костыль чтобы пермещеать клетку за нижнию часть поравильно
      if (this.deltaOver ==-2)
        this.deltaOver++;
        else if (this.deltaOver == -1){
        this.deltaOver = this.indexOver - event.source.dropContainer.data.id;
      } 

    }else cell = new ParkingCell(-1,event.source.dropContainer.data, 0);

    // console.log(this.deltaOver);
    // arrHeight.add(Math.floor(index / this.cols));
    // arrWidth.add(index % this.cols)
    
    this.selectedCells = this.parkingMap.getCellPositions(this.indexOver-(this.deltaOver<0?0:this.deltaOver), cell.template);
  }

  public resetLinksToParkingCells() {
    let links = this.parkingMap
      .getParkingCells()
      .map((cell) => this.linkOfParkingCell + cell.id);
    this.linksToParkingCells.length = 0;
    this.linksToParkingCells.push(...links);
  }
}

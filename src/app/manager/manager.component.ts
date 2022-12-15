import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingMap } from '../designer/models/parking-map';
import { DesignerService } from '../designer/services/designer.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  file: File | null = null;
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    let pLoadTopology = this.loadTopology;
    let pRouter = this.router;
    let pDesignerService = this.designerService;
    let fileReader = new FileReader( );
    fileReader.onload = function(){
      pLoadTopology(this,pDesignerService);
      pRouter.navigate(['/manager/simulation']);

    }
    fileReader.readAsText(this.file);
  }

  loadTopology(fileReader:FileReader, designerService:DesignerService):void {
    let jsonStr:string = fileReader.result == null?" ":fileReader.result.toString();
    let parkingMap:ParkingMap = JSON.parse(jsonStr);
      designerService.setParkingMap(JSON.parse(jsonStr));
      designerService.getSetupParkingForm().value.name = parkingMap.name;
      designerService.getSetupParkingForm().value.cols =  parkingMap.cols;
      designerService.getSetupParkingForm().value.rows = parkingMap.rows;
      designerService.getSetupParkingForm().value.directOfRoad = parkingMap.directOfRoad;
  }
  
  constructor(public designerService:DesignerService,public router: Router){}
  ngOnInit(): void {
  }

}

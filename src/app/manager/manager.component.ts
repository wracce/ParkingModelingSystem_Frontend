import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingMap } from '../designer/models/parking-map';
import { SimulationService } from '../simulation/services/simulation.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
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
    let pSimulationService = this.simulationService;
    let fileReader = new FileReader();
    fileReader.onload = function () {
      pLoadTopology(this, pSimulationService);
      pRouter.navigate(['/manager/simulation']);
    };
    fileReader.readAsText(this.file);
  }

  loadTopology(fileReader: FileReader, simulationService: SimulationService): void {
    let jsonStr: string =
      fileReader.result == null ? 'Unitiled' : fileReader.result.toString();
    let newParkingMap: ParkingMap = JSON.parse(jsonStr);
    let parkingMap: ParkingMap = simulationService.parkingMap;

    parkingMap.getCells().length = 0;
    parkingMap.getCells().push(...newParkingMap.parkingCells);
    parkingMap.name = newParkingMap.name;
    parkingMap.cols = newParkingMap.cols;
    parkingMap.widthOfRoad = newParkingMap.widthOfRoad;
    parkingMap.rows = newParkingMap.rows;
    parkingMap.directOfRoad = newParkingMap.directOfRoad;

  }

  constructor(public simulationService: SimulationService, public router: Router) {}
  ngOnInit(): void {}
}

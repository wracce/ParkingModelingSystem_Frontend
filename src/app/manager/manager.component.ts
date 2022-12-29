import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingMap } from '../designer/models/parking-map';
import { SimulationService } from '../simulation/services/simulation.service';
import { DataShareService } from '../core/service/data-share.service';
import { UserService } from '../core/service/user.service';
import { ParkingFileManager } from '../designer/models/parking-file-manager';
import { Validator } from '../simulation/validation/validator';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorDialogComponent } from '../simulation/validation/validator-dialog/validator-dialog.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  fio: string;
  login: string;
  file: File | null = null;
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    let pDialog = this.dialog;
    let pRouter = this.router;
    let pSimulationService = this.simulationService;
    let fileReader = new FileReader();
    fileReader.onload = function () {
      let map = new ParkingMap();
      let validator = new Validator(map);
      if (ParkingFileManager.loadFromFileReader(this, map)) {
        if (validator.validate()) {
          pSimulationService.simulationMap.from(map);
          pRouter.navigate(['/manager/simulation']);
          return;
        } else{
          pDialog.open(ValidatorDialogComponent,{data:{messange: ["Неверная топология"]}})
        }
      } else {
        pDialog.open(ValidatorDialogComponent,{data:{messange: ["Файл не распознан"]}})
      }
    };
    fileReader.readAsText(this.file);
  }

  constructor(
    public simulationService: SimulationService,
    public router: Router,
    private dataShareService: DataShareService,
    private userService: UserService,
    private dialog:MatDialog
  ) {
    this.dataShareService.currentUser.subscribe((r) => {
      this.userService.getByUsername(r).subscribe((r2) => {
        this.fio = r2.fio;
        this.login = r2.username;
      });
    });
  }
  ngOnInit(): void {}
}

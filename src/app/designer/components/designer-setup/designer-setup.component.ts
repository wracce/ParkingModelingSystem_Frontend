import { Component, OnInit } from '@angular/core';
import { ParkingMap } from '../../models/parking-map';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-designer-setup',
  templateUrl: './designer-setup.component.html',
  styleUrls: ['./designer-setup.component.scss'],
})
export class DesignerSetupComponent implements OnInit {
  public parkingMap: ParkingMap = new ParkingMap();

  constructor(public designerService: DesignerService) {
    this.parkingMap = designerService.getParkingMap();
  }

  ngOnInit(): void {console.log("hi");
  }
}

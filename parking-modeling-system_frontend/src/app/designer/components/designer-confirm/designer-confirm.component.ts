import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ParkingMap } from '../../models/parking-map';
import { DesignerService } from '../../services/designer.service';

@Component({
  selector: 'app-designer-confirm',
  templateUrl: './designer-confirm.component.html',
  styleUrls: ['./designer-confirm.component.scss']
})
export class DesignerConfirmComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  file: File | null = null;

  constructor(public designerService:DesignerService) { }

  ngOnInit(): void {
  }


  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  saveAsTopology(){
    this.writeContents(this.designerService.getParkingMap(), this.designerService.getParkingMap().name+'.PSF', 'text/plain');
  }

  private writeContents(content:ParkingMap, fileName:string, contentType:string) {
    let a = document.createElement('a');
    let file = new Blob([JSON.stringify(content)], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}

import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';

export class ParkingTemplateGroup {
  private parkingTemplates!: ParkingTemplate[];

  constructor (){
    this.parkingTemplates = [
        new ParkingTemplate("", '/assets/p11.png',ParkingState.Park, 1,1),
        new ParkingTemplate("", '/assets/p12.png',ParkingState.Park, 2,1),
        new ParkingTemplate("", '/assets/p21.png',ParkingState.Park, 1,2),
        new ParkingTemplate("", '/assets/tree/tree1.png',ParkingState.Solid, 1,1),

        
      ];
  }
  public add(parkingTemplate: ParkingTemplate): void {
    this.parkingTemplates.push(parkingTemplate);
  }

  public delete(parkingTemplate: ParkingTemplate): void {
    const index = this.parkingTemplates.indexOf(parkingTemplate);
    if (index > -1) this.parkingTemplates.splice(index, 1);
  }

  public getParkingTemplates(): ParkingTemplate[]{
    return this.parkingTemplates;
  }

}

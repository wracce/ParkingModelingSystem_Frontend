import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';

export class ParkingTemplateGroup {
  private parkingTemplates!: ParkingTemplate[];

  constructor (){
    this.parkingTemplates = [
        new ParkingTemplate("", '/assets/p11.png',ParkingState.Park,0, 1,1),
        new ParkingTemplate("", '/assets/p12.png',ParkingState.Park,0, 2,1),
        new ParkingTemplate("", '/assets/p21.png',ParkingState.Park,0, 1,2),
        new ParkingTemplate("", '/assets/car/car1.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car2.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car3.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car4.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car5.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car6.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/car/car7.png',ParkingState.Car,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree1.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree2.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree3.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree4.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree5.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree6.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree7.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree8.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree9.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree10.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree11.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree12.png',ParkingState.Solid,0, 1,1),
        new ParkingTemplate("", '/assets/tree/tree13.png',ParkingState.Solid,0, 1,1),

        
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

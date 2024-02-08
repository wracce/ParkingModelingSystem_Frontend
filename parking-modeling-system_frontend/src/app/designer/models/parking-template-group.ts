import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';

export class ParkingTemplateGroup {
  private parkingTemplates!: ParkingTemplate[];

  constructor (){
    this.parkingTemplates = [
        new ParkingTemplate("Парковочное место 1x1", '/assets/p11.png',ParkingState.Park, 1,1),
        new ParkingTemplate("Парковочное место 1x2", '/assets/p12.png',ParkingState.Park, 2,1),
        new ParkingTemplate("Парковочное место 2x1", '/assets/p21.png',ParkingState.Park, 1,2),
        new ParkingTemplate("Дерево", '/assets/tree.png',ParkingState.Solid, 1,1),
        new ParkingTemplate("Стена угловая", '/assets/wall90.png',ParkingState.Solid, 1,1),
        new ParkingTemplate("Стена прямая", '/assets/wall180.png',ParkingState.Solid, 1,1),
        new ParkingTemplate("Стрелка", '/assets/arrow.png',ParkingState.NonSolid, 1,1),
        new ParkingTemplate("Паркомат", '/assets/Parkomat.png',ParkingState.ParkingMeter, 1,1),
        new ParkingTemplate("Шлагбаум", '/assets/wlagbaum.png',ParkingState.Barrier, 1,1),
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

import { ParkingState } from './parking-state';
import { ParkingTemplate } from './parking-template';

export class ParkingTemplateGroup {
  private parkingTemplates!: ParkingTemplate[];

  constructor (){
    this.parkingTemplates = [
        new ParkingTemplate("", '/assets/car/car1.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car2.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car3.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car4.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car5.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car6.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/car/car7.png',"Жигули",ParkingState.Car,0),
        new ParkingTemplate("", '/assets/tree/tree1.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree2.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree3.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree4.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree5.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree6.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree7.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree8.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree9.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree10.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree11.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree12.png',"Деревья",ParkingState.Solid,0),
        new ParkingTemplate("", '/assets/tree/tree13.png',"Деревья",ParkingState.Solid,0),

        
      ];
  }
  public add(parkingTemplate: ParkingTemplate): void {
    this.parkingTemplates.push(parkingTemplate);
  }

  public delete(parkingTemplate: ParkingTemplate): void {
    const index = this.parkingTemplates.indexOf(parkingTemplate);
    if (index > -1) this.parkingTemplates.splice(index, 1);
  }

  public getGroupList():string[] {
    let arr = this.parkingTemplates.map(item => item.group);
    return arr.filter((item, index) => arr.indexOf(item) === index );
  }

  public getGroup(group:string):ParkingTemplate[] {
    return this.parkingTemplates.filter(item => item.group.localeCompare(group) === 0);
  }
}

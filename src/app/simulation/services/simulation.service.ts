import { Injectable } from '@angular/core';
import { ParkingMap } from 'src/app/designer/models/parking-map';
import { Car } from '../models/car';
import { CarTemplate } from '../models/car-template';
import { SimulationEngine } from '../models/simulation-engine';
import { SimulationMap } from '../models/simulation-map';
import { BoardView } from '../models/board-view';
import { ParkingMeter } from '../models/ParkingSystem/parkingMeter';
import { FormControl, FormGroup } from '@angular/forms';
import { SimulationTime } from '../models/simulation-time';
import { DeterminateDistribution } from '../models/distributions/determinate-distribution';
import { NormalDistribution } from '../models/distributions/normal-distribution';
import { Distribution } from '../models/distributions/distribution';
import { TableRow } from '../models/table-row';
import { from, map, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  public simulationMap!: SimulationMap;
  public carTemplates!: CarTemplate[];
  public truckTemplates!: CarTemplate[];

  public setupSimulationForm!: FormGroup;

  public simulationEngine!: SimulationEngine;
  public simulationTime!: SimulationTime;

  public boardView!: BoardView;
  public parkingTable$: Observable<TableRow[]> = of([]);

  constructor() {
    this.simulationMap = new SimulationMap(this);

    this.simulationEngine = new SimulationEngine(this);

    this.carTemplates = [
      new CarTemplate('/assets/cars/car1.png', 145, 86),
      new CarTemplate('/assets/cars/car2.png', 86, 145),
      new CarTemplate('/assets/cars/car3.png', 86, 145),
      new CarTemplate('/assets/cars/car4.png', 86, 145),
      new CarTemplate('/assets/cars/car5.png', 86, 145),
    ];

    this.truckTemplates = [
      new CarTemplate('/assets/cars/truck1.png', 145, 86),
      new CarTemplate('/assets/cars/truck2.png', 86, 145),
    ];
    this.boardView = new BoardView(0, 0, 0);

    this.setupSimulationForm = new FormGroup({
      startTime: new FormControl('8:00'),
      traficDistribution: new FormControl(new NormalDistribution()),
      parkingDistribution: new FormControl(new NormalDistribution()),
      enterChance: new FormControl(50),
      truckChance: new FormControl(50),
      dayCost: new FormControl(50),
      nightCost: new FormControl(50),
    });

    this.simulationTime = new SimulationTime(new Date(), 1000, 60000); // tick 1s = 1m real time

    //this.parkingTable$ = new Observable<TableRow[]>();
  }

  public configurateSimulation() {
    let timeStr = this.setupSimulationForm.value['startTime'];
    let timeArr = timeStr.match(/\d+/g);
    this.simulationTime.configurate(timeArr[0], timeArr[1], 0);
    this.parkingTable$ = this.parkingTable$.pipe(map(value=> []));
  }

  public addRowToParkingTable(
    timeIn: string,
    timeParking: number,
    cost: number
  ): void {
    this.parkingTable$ = this.parkingTable$.pipe(map(value=> [...value,new TableRow(value.length + 1, timeIn, timeParking, cost)]));
  }

  public getParkingTable():Observable<TableRow[]> {
    return this.parkingTable$;
  }
}

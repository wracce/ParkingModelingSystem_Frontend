import {SimulationService} from '../services/simulation.service';
import {Car, CarSimulationState, CarType} from './car';
import {Distribution} from './distributions/distribution';
import {UniformDistribution} from './distributions/uniform-distribution';
import {SimulationMap} from './simulation-map';
import {SimulationTime} from './simulation-time';
import {TableRow} from './table-row';
import {MatDialog} from "@angular/material/dialog";
import {TotalScoreDialogComponent} from "../components/total-score-dialog/total-score-dialog.component";
import {of} from "rxjs";

export class SimulationEngine {
  public timer!: SimulationTime;
  public isPlay!: boolean;
  public isRun!: boolean;

  public angle: number;
  private carAngle: number;
  private spawnCellId: number;
  private endCellId: number;
  private rows: number;
  private cols: number;
  public cars!: Car[];

  private timeId!: number;

  private countInitTime!: number;
  private initTimeout!: number;

  private initDistribution!: Distribution;
  private stayDistribution!: Distribution;
  private enterChance!: number;
  private truckChance!: number;
  private dayCost!: number;
  private nightCost!: number;

  constructor(
    public simulationService: SimulationService,
    private scoreDialog: MatDialog) {
    this.cars = [];
  }

  public init(
    traficDistribution: Distribution,
    parkingDistribution: Distribution,
    enterChance: number,
    truckChance: number,
    dayCost: number,
    nightCost: number
  ) {
    this.initDistribution = traficDistribution;
    this.stayDistribution = parkingDistribution;
    this.enterChance = enterChance;
    this.truckChance = truckChance;
    this.dayCost = dayCost;
    this.nightCost = nightCost;

    this.isRun = false;
    this.isPlay = false;
    this.cars.length = 0;
    this.countInitTime = 0;
    this.initTimeout = 0;

    this.timer = this.simulationService.simulationTime;

    this.simulationService.simulationMap.parkingMeter.reset();
    this.calculateCarSpecs();
  }

  public run() {
    if (!this.isRun)
      this.timeId = window.setInterval(() => this.step(), this.timer.delayTick);
    this.isPlay = true;
    this.isRun = true;
  }

  public stop() {
    if (this.isRun) {
      clearInterval(this.timeId);
      this.getScore();
      this.isPlay = false;
      this.isRun = false;
    }
  }

  public pause() {
    this.isPlay = false;
  }

  private step() {
    if (!this.isPlay) return;
    let newCar: Car;

    this.simulationService.simulationMap.parkingMeter.configurateBarrier();

    this.cars = this.cars.filter((car) => {
      if (car.state !== CarSimulationState.END) {
        if (car != newCar) {
          car.step();
          if (car.isVisit && car.path.length > 0) {
            let barrierId = this.simulationService.simulationMap.getPosById(this.simulationService.simulationMap.parkingMeter.startBarrierCell.id);
            if (car.path[0].x == barrierId.x && car.path[0].y == barrierId.y)
              this.simulationService.addRowToParkingTable(
                this.timer.getDisplayTime(),
                car.stayTime / this.timer.realTickMs,
                this.getMoney(car)
              );
          }
        }
        return true;
      } else {
        return false;
      }
    });

    if (this.countInitTime >= this.initTimeout) {
      this.countInitTime = 0;
      this.initTimeout =
        this.initDistribution.nextValue() * this.timer.realTickMs;


      let stayTime =
        Math.floor(this.stayDistribution.nextValue()) * this.timer.realTickMs;
      let isVisit =
        (Math.floor(new UniformDistribution(0, 100).nextValue()) <= this.enterChance) && stayTime != 0;
      let randtomType =
        Math.floor(new UniformDistribution(0, 100).nextValue()) <=
        this.truckChance
          ? CarType.Truck
          : CarType.Car;
      let randomLength = new UniformDistribution(
        0,
        randtomType == CarType.Car
          ? this.simulationService.carTemplates.length
          : this.simulationService.truckTemplates.length
      ).nextValue();
      let randomTemplate =
        randtomType == CarType.Car
          ? this.simulationService.carTemplates[randomLength]
          : this.simulationService.truckTemplates[randomLength];

      newCar = new Car(
        this.spawnCellId,
        this.endCellId,
        this.carAngle,
        this,
        isVisit,
        randomTemplate,
        randtomType,
        stayTime,
        this.timer,
        this.timer.realTickMs,
        this.simulationService
      );
      this.cars.push(newCar);
    }

    this.countInitTime += this.timer.realTickMs;
    this.timer.addTick();
  }

  private getScore(): void {
    let minCost: number = 1000000;
    let maxCost: number = 0;
    let avgCost: number = 0;
    let totalCost: number = 0;
    let minTime: number = 1000000;
    let maxTime: number = 0;
    let avgTime: number = 0;
    let totalTime: number = 0;

    this.simulationService.getParkingTable().subscribe((val) => {
      val.forEach((r) => {
        if (r.cost < minCost) minCost = r.cost;
        if (r.cost > maxCost) maxCost = r.cost;
        totalCost += r.cost;
        if (r.parkingTime < minTime) minTime = r.parkingTime;
        if (r.parkingTime > maxTime) maxTime = r.parkingTime;
        totalTime += r.parkingTime;
       });
      avgCost = Math.round((totalCost / val.length) * 100) / 100;
      avgTime = Math.round((totalTime / val.length) * 100) / 100;
      let delta = (this.timer.getTickDelta()/60000);
      console.log(delta);
      this.scoreDialog.open(TotalScoreDialogComponent, {
        data: {
          minCost,
          maxCost,
          avgCost,
          totalCost,
          minTime,
          maxTime,
          avgTime,
          totalTime,
          delta,
        }
      }).afterClosed().subscribe(() => {
        this.simulationService.parkingTable$ = of([]);
        this.cars = [];
        this.countInitTime = 0;
        this.initTimeout = 0;

        this.timer = this.simulationService.simulationTime;

        this.simulationService.simulationMap.parkingMeter.reset();
        this.simulationService.simulationTime.getDisplayTime();
        this.simulationService.simulationTime.reset();
      })
    });
  }

  private calculateCarSpecs(): void {
    let direct = this.simulationService.simulationMap.directOfRoad;
    this.rows = this.simulationService.simulationMap.rows;
    this.cols = this.simulationService.simulationMap.cols;
    if (direct === 'left') {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(
        0,
        this.rows - 1
      );
      this.endCellId = this.simulationService.simulationMap.getIdByPos(0, 0);
      this.carAngle = 0;
    } else if (direct === 'top') {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(0, 0);
      this.endCellId = this.simulationService.simulationMap.getIdByPos(
        this.cols - 1,
        0
      );
      this.carAngle = 90;
    } else if (direct === 'right') {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(
        this.cols - 1,
        0
      );
      this.endCellId = this.simulationService.simulationMap.getIdByPos(
        this.cols - 1,
        this.rows - 1
      );
      this.carAngle = 180;
    } else if (direct === 'bottom') {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(
        this.cols - 1,
        this.rows - 1
      );
      this.endCellId = this.simulationService.simulationMap.getIdByPos(
        0,
        this.rows - 1
      );
      this.carAngle = -90;
    }

  }

  public getMoney(car: Car): number {
    let minDayTime = (new Date());
    minDayTime.setTime(this.timer.time.getTime());
    minDayTime.setHours(6);
    minDayTime.setMinutes(0);
    minDayTime.setSeconds(0);
    let maxDayTime = (new Date());
    maxDayTime.setTime(this.timer.time.getTime());
    maxDayTime.setHours(23);
    maxDayTime.setMinutes(59);
    maxDayTime.setSeconds(59);
    this.timer.time
    if (this.timer.time >= minDayTime && this.timer.time <= maxDayTime) {

      return Math.ceil(this.dayCost * car.stayTime / this.timer.realTickMs/60);
    }
    return Math.ceil(this.nightCost * car.stayTime / this.timer.realTickMs/60);
  }
}

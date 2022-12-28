import { SimulationService } from '../services/simulation.service';
import { Car, CarSimulationState, CarType } from './car';
import { Distribution } from './distributions/distribution';
import { UniformDistribution } from './distributions/uniform-distribution';
import { SimulationTime } from './simulation-time';
import { TableRow } from './table-row';

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

  private timeId!: NodeJS.Timer;

  private countInitTime!: number;
  private initTimeout!: number;

  private initDistribution!: Distribution;
  private stayDistribution!: Distribution;
  private enterChance!: number;
  private truckChance!: number;
  private dayCost!: number;
  private nightCost!: number;

  constructor(public simulationService: SimulationService) {
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
      this.timeId = setInterval(() => this.step(), this.timer.delayTick);
    this.isPlay = true;
    this.isRun = true;
  }

  public stop() {
    if (this.isRun) {
      clearInterval(this.timeId);
      this.isPlay = false;
      this.isRun = false;
    }
  }

  public pause() {
    this.isPlay = false;
  }

  private step() {

    if (!this.isPlay) return;
    let newCar:Car;

    this.simulationService.simulationMap.parkingMeter.configurateBarrier();

    this.cars = this.cars.filter(
      (car) => {
        if (car.state !== CarSimulationState.END) {
          if (car != newCar)
          car.step();
          return true;
        } else {
          return false;
        }
      }
      );

    if (this.countInitTime >= this.initTimeout) {
      this.countInitTime = 0;
      this.initTimeout = this.initDistribution.nextValue()*this.timer.realTickMs;

      let isVisit =
        Math.floor(new UniformDistribution(0, 100).nextValue()) <=
        this.enterChance;
      let stayTime = Math.floor(this.stayDistribution.nextValue())*this.timer.realTickMs;;
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
        this.simulationService,
      );
      this.cars.push(newCar);
      this.simulationService.addRowToParkingTable(
        this.timer.getDisplayTime(),
        stayTime/1000,
        5000
      );

    }



    this.countInitTime += this.timer.realTickMs;
    this.timer.addTick();
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
}

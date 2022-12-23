import {SimulationService} from '../services/simulation.service';
import {Car, CarSimulationState, CarType} from './car';
import {Distribution} from './distributions/distribution';
import {UniformDistribution} from "./distributions/uniform-distribution";

export class SimulationEngine {
  public timeDelay!: number;
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
  private initDistribution!: Distribution
  private countStayTime!: number;
  private stayTimeout!: number;
  private stayDistribution!: Distribution

  constructor(public simulationService: SimulationService) {
    this.cars = [];
  }

  public init(timeDelay: number, initDistribution:Distribution, stayDistribution:Distribution) {
    this.isRun = false;
    this.isPlay = false;
    this.cars.length = 0;

    this.countInitTime = 0;
    this.initTimeout = 0;
    this.countStayTime = 0;
    this.stayTimeout = 0;

    this.timeDelay = timeDelay;
    this.initDistribution = initDistribution;
    this.stayDistribution = stayDistribution;

    this.simulationService.simulationMap.parkingMeter.parkingPlaces.forEach(x=>x.available=true);
    this.calculateCarSpecs();
  }

  public run() {
    if (!this.isRun)
      this.timeId = setInterval(() => this.step(), this.timeDelay);
    this.isPlay = true;
    this.isRun = true;
  }

  public stop() {
    if (this.isRun){
      clearInterval(this.timeId);
      this.isPlay = false;
      this.isRun = false;
    }
  }

  public pause() {
    this.isPlay = false;
  }

  private step() {
    if(!this.isPlay)
      return

    if (this.countInitTime >= this.initTimeout) {
      this.countInitTime = 0;
      this.initTimeout = this.initDistribution.nextValue();
      let rType = Math.random() <0.5?CarType.Car:CarType.Truck;
      let rTemplate = rType==CarType.Car?this.simulationService.carTemplates[Math.floor((new UniformDistribution(0,5)).nextValue())]:this.simulationService.truckTemplates[Math.floor((new UniformDistribution(0,2)).nextValue())];
      this.cars.push(
        new Car(
          this.spawnCellId,
          this.endCellId,
          this.carAngle,
          this,
          true,
          rTemplate,
          rType));
    }

    this.cars = this.cars.filter(
      (car) => {
        if (car.state !== CarSimulationState.END) {
          car.step();
          return true;
        }
        else {
          return false;
        }
      }
    )

    console.log(this.cars)

    this.countInitTime += this.timeDelay;
  }
  private calculateCarSpecs() {
    let direct = this.simulationService.simulationMap.directOfRoad;
    this.rows = this.simulationService.simulationMap.rows;
    this.cols = this.simulationService.simulationMap.cols;
    console.log("ROWS: ", this.rows);
    console.log("COLS: ", this.cols);
    if (direct === "left") {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(0, this.rows - 1);
      this.endCellId = this.simulationService.simulationMap.getIdByPos(0, 0);
      this.carAngle = 0;
    } else if (direct === "top") {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(0, 0);
      this.endCellId = this.simulationService.simulationMap.getIdByPos(this.cols - 1, 0);
      this.carAngle = 90;
    } else if (direct === "right") {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(this.cols - 1, 0);
      this.endCellId = this.simulationService.simulationMap.getIdByPos(this.cols - 1, this.rows - 1);
      this.carAngle = 180;
    } else if (direct === "bottom") {
      this.spawnCellId = this.simulationService.simulationMap.getIdByPos(this.cols - 1, this.rows - 1);
      this.endCellId = this.simulationService.simulationMap.getIdByPos(0, this.rows - 1);
      this.carAngle = -90;
    }
  }
}

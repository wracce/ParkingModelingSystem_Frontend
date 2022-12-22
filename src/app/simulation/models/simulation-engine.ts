import {SimulationService} from '../services/simulation.service';
import {Car, CarType} from './car';
import {Distribution} from './distributions/distribution';
import {UniformDistribution} from "./distributions/uniform-distribution";

export class SimulationEngine {
  private timeId!: NodeJS.Timer;
  private isStart!: boolean;
  public timeDelay!: number;

  public angle: number;
  private carAngle: number;
  private spawnCellId: number;
  private endCellId: number;
  private rows: number;
  private cols: number;
  public cars!: Car[];

  private countInitTime!: number;
  private initTimeout!: number;
  private initDistribution!: Distribution
  private countStayTime!: number;
  private stayTimeout!: number;
  private stayDistribution!: Distribution

  constructor(public simulationService: SimulationService) {
    this.cars = [];
  }

  public init(timeDelay: number, initDistribution: Distribution, stayDistribution: Distribution) {
    this.isStart = false;
    this.cars.length = 0;

    this.countInitTime = 0;
    this.initTimeout = 0;
    this.countStayTime = 0;
    this.stayTimeout = 0;

    this.timeDelay = timeDelay;
    this.initDistribution = initDistribution;
    this.stayDistribution = stayDistribution;

    this.calculateCarSpecs();
  }



  public async run() {
    if (!this.isStart)
      this.timeId = setInterval(() => this.step(), this.timeDelay);
  }

  public async stop() {
    console.log("STOP")
    if (this.isStart)
      clearInterval(this.timeId);
  }

  private step() {
    if (this.countInitTime >= this.initTimeout) {
      this.isStart = true;
      this.countInitTime = 0;
      this.initTimeout = this.initDistribution.nextValue();
      this.cars.push(
        new Car(
          this.spawnCellId,
          this.endCellId,
          this.carAngle,
          this,
          true,
          this.simulationService.carTemplates[Math.floor((new UniformDistribution(0,6)).nextValue())],
          CarType.Car));
    }

    this.cars.forEach(
      (car) => {
        car.step()
      }
    );
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

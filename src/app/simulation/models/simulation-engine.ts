import {SimulationService} from '../services/simulation.service';
import {Car, CarType} from './car';
import {Distribution} from './distributions/distribution';

export class SimulationEngine {
  private timeId!: NodeJS.Timer;
  private isStart!: boolean;
  public timeDelay!: number;

  public cars!: Car[];

  private countInitTime!: number;
  private initTimeout!: number;
  private initDistribution!:Distribution
  private countStayTime!: number;
  private stayTimeout!: number;
  private stayDistribution!:Distribution

  constructor(public simulationService:SimulationService) {
    this.cars = [];
  }

  public init(timeDelay: number, initDistribution:Distribution, stayDistribution:Distribution) {
    this.isStart = false;
    this.cars.length = 0;

    this.countInitTime=0;
    this.initTimeout=0;
    this.countStayTime=0;
    this.stayTimeout=0;

    this.timeDelay = timeDelay;
    this.initDistribution = initDistribution;
    this.stayDistribution = stayDistribution;
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
    if (this.countInitTime >= this.initTimeout)
    {
      this.isStart = true;
      this.countInitTime == 0;
      this.initTimeout = this.initDistribution.nextValue();
      this.cars.push(new Car(0,0,0,0, this,true ,this.simulationService.carTemplates[0], CarType.Car));
    }

    this.cars.forEach(
      (car) => {
        car.step()
      }
    );

    this.countInitTime+= this.timeDelay;
  }

}

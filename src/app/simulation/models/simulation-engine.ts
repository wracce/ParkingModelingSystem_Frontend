import {SimulationService} from '../services/simulation.service';
import {Car, CarType} from './car';
import {Distribution} from './distributions/distribution';

export class SimulationEngine {
  public timeDelay!: number;
  public isPlay!: boolean;
  public isRun!: boolean;
  public cars!: Car[];

  private timeId!: NodeJS.Timer;

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
    this.isRun = false;
    this.isPlay = false;
    this.cars.length = 0;

    this.countInitTime=0;
    this.initTimeout=0;
    this.countStayTime=0;
    this.stayTimeout=0;

    this.timeDelay = timeDelay;
    this.initDistribution = initDistribution;
    this.stayDistribution = stayDistribution;

    this.simulationService.simulationMap.parkingMeter.parkingPlaces.forEach(x=>x.available=true);
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

    if (this.countInitTime >= this.initTimeout)
    {
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

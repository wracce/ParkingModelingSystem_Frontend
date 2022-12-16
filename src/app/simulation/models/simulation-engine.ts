import { interval, Observable } from "rxjs";
import { Car } from "./car";

export class SimulationEngine {
    public timeDelay!:number;
    engine: Observable<Car>|undefined;
    constructor(timeDelay:number){this.timeDelay = timeDelay}

    // public start(){
    //     this.engine = interval(this.timeDelay).pipe(map()))
    // }

    // private doEvent():void{
    
    // }
}

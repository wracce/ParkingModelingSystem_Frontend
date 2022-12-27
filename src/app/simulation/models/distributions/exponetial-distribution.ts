import { environment } from "src/environments/environment";
import { Distribution } from "./distribution";
import { DistributionType } from "./distribution-type";

export class ExponetialDistribution implements Distribution {
    public distributionType = DistributionType.EXPONETIAL;
    public lambda!:number;
    constructor(lambda?:number){
        this.lambda = lambda??environment.lambdaExponetialDistribution;
    }
    public nextValue(){
        return Math.log(1-Math.random())/(- this.lambda)
    }
}

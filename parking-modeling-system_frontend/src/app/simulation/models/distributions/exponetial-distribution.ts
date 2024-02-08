import {environment} from "src/environments/environment";
import {Distribution} from "./distribution";
import {DistributionType} from "./distribution-type";

export class ExponetialDistribution implements Distribution {
  public distributionType = DistributionType.EXPONETIAL;
  public lambda!: number;

  constructor(lambda?: number) {
    this.lambda = lambda ?? environment.lambdaExponetialDistribution;
  }

  public nextValue() {
    console.log("exp");
    // let ret = Math.abs(Math.log(1 - Math.random()) / (-this.lambda));
    let ret = Math.abs(1 - (Math.exp(-this.lambda * Math.random())));
    while (ret == 0)
      ret =Math.abs(1 - (Math.exp(-this.lambda * Math.random())));
    return ret;
  }
}

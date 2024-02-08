import {environment} from "src/environments/environment";
import {Distribution} from "./distribution";
import {DistributionType} from "./distribution-type";

export class DeterminateDistribution implements Distribution {
  public distributionType = DistributionType.DETERMINATE;
  public value!: number;

  constructor(value?: number) {
    this.value = value ?? environment.valueDeterminateDistribution;
  }

  public nextValue() {
    console.log("interval");
    return this.value;

  }
}

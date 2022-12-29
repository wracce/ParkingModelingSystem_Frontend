import { environment } from "src/environments/environment";
import { Distribution } from "./distribution";
import { DistributionType } from "./distribution-type";

export class UniformDistribution implements Distribution {
    public distributionType = DistributionType.UNIFORM;
    public min!:number;
    public max!:number;
    constructor(min?:number,max?:number){
        this.min = min??environment.minUniformDistribution;
        this.max = max??environment.maxUniformDistribution;
    }
    public nextValue(){
      console.log("uni");
        let ret = Math.abs(Math.floor(Math.random() * (this.max - this.min)) + this.min);
        while (ret == 0) ret = Math.abs(Math.floor(Math.random() * (this.max - this.min)) + this.min);
        return ret;
    }
}

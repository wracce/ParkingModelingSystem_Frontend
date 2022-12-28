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
        let res = Math.floor(Math.random() * (this.max - this.min)) + this.min;
        return res;
    }
}

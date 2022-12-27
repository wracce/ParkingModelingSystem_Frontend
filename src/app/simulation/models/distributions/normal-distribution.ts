import { environment } from "src/environments/environment";
import { Distribution } from "./distribution";
import { DistributionType } from "./distribution-type";

export class NormalDistribution implements Distribution {
    public distributionType = DistributionType.NORMAL;
    public mx!:number;
    public dx!:number;
    constructor(mx?:number, dx?:number){  
        this.mx = mx??environment.mxNormalDistribution;
        this.dx = dx??environment.dxNormalDistribution;
        }
    public nextValue():number{
        let u = 1 - Math.random(); //Converting [0,1) to (0,1)
        let v = Math.random();
        let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        // Transform to the desired mean and standard deviation:
        return z * this.dx + this.mx;
    }

}
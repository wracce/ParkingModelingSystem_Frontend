import { Distribution } from "./distribution";

export class ExponetialDistribution implements Distribution {
    constructor(public λ:number){}
    public nextValue(){
        return Math.log(1-Math.random())/(- this.λ)
    }
}

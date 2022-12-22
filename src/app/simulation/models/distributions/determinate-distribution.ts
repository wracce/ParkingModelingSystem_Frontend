import { Distribution } from "./distribution";

export class DeterminateDistribution implements Distribution {
    constructor(public value:number){}
    public nextValue(){
        return this.value;
    }
}

import { Distribution } from "./distribution";

export class UniformDistribution implements Distribution {
    constructor(public min:number, public max:number){}
    public nextValue(){
        return Math.floor(Math.random() * (this.max - this.min)) + this.min;
    }
}
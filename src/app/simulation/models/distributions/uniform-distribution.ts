import { Distribution } from "./distribution";

export class UniformDistribution implements Distribution {
    public nextValue(){
        return 100;
    }
}
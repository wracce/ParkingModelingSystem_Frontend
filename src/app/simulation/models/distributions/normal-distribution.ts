import { Distribution } from "./distribution";

export class NormalDistribution implements Distribution {
    public nextValue(){
        return 100;
    }
}
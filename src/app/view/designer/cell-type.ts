import { CellState } from "./cell-state";

export class CellType {
    constructor(public src:any, public group: string, public state:CellState, public angle:number){}
}


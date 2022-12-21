export abstract class RouteCar{

    
    private convertArrToMatrix(arr:number[], cols:number):number[]{
        let matrix:number[] = [];
        while(arr.length) matrix.push(...arr.splice(0,cols));
        return matrix;
    }
}
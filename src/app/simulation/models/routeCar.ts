import {ParkingCell} from "../../designer/models/parking-cell";
import {ParkingState} from "../../designer/models/parking-state";
import {ParkingMap} from "../../designer/models/parking-map";
import {AStarFinder} from "./lib/finders/astar-finder";

export abstract class RouteCar{

    public static convertArrToMatrix(arr:number[], cols:number){
        let matrix:number[][] = [];
        while(arr.length) matrix.push(arr.splice(0,cols));
        return matrix;
    }

    public static getMap(parkingCells: ParkingCell[]): number[] {

      const routeMap:number[] = [];
      parkingCells.forEach((val) => {
        // if (val.template.state === ParkingState.Undef
        //   || val.template.state === ParkingState.NonSolid
        //   || val.template.state === ParkingState.Road
        //   || val.template.state === ParkingState.Barrier) {
        //   routeMap.push(0);
        // } else {
        //   routeMap.push(1);
        // }
        routeMap.push(0);//TODO
      });
      console.log(parkingCells,routeMap);
      // @ts-ignore
      return routeMap;
    }

    public static getPathToDest(arr:ParkingMap, gate: ParkingCell, cell: ParkingCell): number[] {
      let aStarInstance = new AStarFinder({
        grid: {
          matrix: this.convertArrToMatrix(this.getMap(arr.parkingCells),arr.cols)
        }
      });
      let startPos = {x: arr.atId(gate.id).xPos, y: arr.atId(gate.id).yPos}
      let goalPos = {x: arr.atId(cell.id).xPos, y: arr.atId(cell.id).yPos}
      console.log(aStarInstance.findPath(startPos, goalPos));
      let newArr:number[] = aStarInstance.findPath(startPos, goalPos).flat();

      return  newArr;


    }
}

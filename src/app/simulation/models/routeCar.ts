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
      let routeMap = [];
      parkingCells.forEach((val) => {
        if (val.template.state === ParkingState.Undef
          || val.template.state === ParkingState.NonSolid) {
          routeMap.push(0);
        } else {
          routeMap.push(1);
        }
      });
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
      let newArr:number[] = aStarInstance.findPath(startPos, goalPos).flat();
      return  newArr;


    }
}

import {ParkingCell} from "../../designer/models/parking-cell";
import {ParkingState} from "../../designer/models/parking-state";
import {ParkingMap} from "../../designer/models/parking-map";
import {AStarFinder} from "./lib/finders/astar-finder";
import { IPoint } from "./lib/interfaces/astar.interfaces";

export abstract class RouteCar{

    public static convertArrToMatrix(arr:number[], cols:number){
        let matrix:number[][] = [];
        while(arr.length) matrix.push(arr.splice(0,cols));
        console.log("MatrixPath: ",matrix);
        
        return matrix;
    }

    public static parkingCellsToWalkables(parkingCells: ParkingCell[]): number[] {
      let routeMap:number[] = [];
      parkingCells.forEach((val) => {
        if (val.template.state === ParkingState.Undef
          || val.template.state === ParkingState.NonSolid
          || val.template.state === ParkingState.Road
          || val.template.state === ParkingState.Barrier) {
          routeMap.push(0);
        } else {
          routeMap.push(1);
        }
      })
      return routeMap;
    }

    public static getPathToDest(map:ParkingMap, sourceCell: ParkingCell, distinationCell: ParkingCell):{x:number,y:number}[] {
      let aStarInstance = new AStarFinder({
        grid: {
          matrix: this.convertArrToMatrix(this.parkingCellsToWalkables(map.parkingCells),map.cols)
        },
        diagonalAllowed: false
      });
      let startPos:IPoint = map.atId(sourceCell.id) as IPoint ;
      let endPos:IPoint = map.atId(distinationCell.id) as IPoint ;
      let path = aStarInstance.findPath(startPos, endPos).map(e=>{return {x:e[0], y:e[1]}});

      console.log("Start: ",startPos);
      console.log("End: ",endPos);
      console.log("Path:",path);
      

      return  path;


    }
}

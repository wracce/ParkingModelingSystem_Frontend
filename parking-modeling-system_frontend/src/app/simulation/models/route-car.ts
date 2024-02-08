import {ParkingCell} from "../../designer/models/parking-cell";
import {ParkingState} from "../../designer/models/parking-state";
import {ParkingMap} from "../../designer/models/parking-map";
import {AStarFinder} from "./lib/finders/astar-finder";
import { IPoint } from "./lib/interfaces/astar.interfaces";

export abstract class RouteCar{

    private static convertArrToMatrix(arr:number[], cols:number){
        let matrix:number[][] = [];
        while(arr.length) matrix.push(arr.splice(0,cols));

        return matrix;
    }

    private static parkingCellsToWalkables(parkingMap: ParkingMap, sourceCell: ParkingCell, destinationCell: ParkingCell, openBarrierCell:ParkingCell): number[] {
      let routeMap:number[] = [];
      parkingMap.parkingCells.forEach((val) => {
        if (val.template.state === ParkingState.Undef
          || val.template.state === ParkingState.NonSolid
          || val.template.state === ParkingState.Road) {
          routeMap.push(0);
        } else {
          routeMap.push(1);
        }
      });

      routeMap[openBarrierCell.id] = 0;

      for(const cellId of parkingMap.getCellPositions(destinationCell.id))
        routeMap[cellId] = 0;

      for(const cellId of parkingMap.getCellPositions(sourceCell.id))
        routeMap[cellId] = 0;
      return routeMap;
    }

    public static getPathToDest(map:ParkingMap, sourceCell: ParkingCell, destinationCell: ParkingCell, barrierCell:ParkingCell):{x:number,y:number}[] {
      let aStarInstance = new AStarFinder({
        grid: {
          matrix: this.convertArrToMatrix(this.parkingCellsToWalkables(map, sourceCell, destinationCell, barrierCell),map.cols)
        },
        diagonalAllowed: false
      });
      let startPos:IPoint = map.getPosById(sourceCell.id) as IPoint ;
      let endPos:IPoint = map.getPosById(destinationCell.id) as IPoint ;
      let path = aStarInstance.findPath(startPos, endPos).map(e=>{return {x:e[0], y:e[1]}});
      return  path.splice(1,path.length);
    }

}

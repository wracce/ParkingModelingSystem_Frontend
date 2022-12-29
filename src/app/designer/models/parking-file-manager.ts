import { SimulationMap } from 'src/app/simulation/models/simulation-map';
import { Validator } from 'src/app/simulation/validation/validator';
import { ParkingMap } from './parking-map';

export abstract class ParkingFileManager {
  public static loadFromFileReader(
    fileReader: FileReader,
    parkingMap: ParkingMap
  ): boolean {
    try {
      let jsonStr: string =
        fileReader.result == null ? 'Unitiled' : fileReader.result.toString();
      let newParkingMap: ParkingMap = JSON.parse(jsonStr);

        parkingMap.getCells().length = 0;
        parkingMap.getCells().push(...newParkingMap.parkingCells);
        parkingMap.name = newParkingMap.name;
        parkingMap.cols = newParkingMap.cols;
        parkingMap.widthOfRoad = newParkingMap.widthOfRoad;
        parkingMap.rows = newParkingMap.rows;
        parkingMap.directOfRoad = newParkingMap.directOfRoad;
        return true;
    } catch (e) {
      console.error('Error load topology!');
      return false;
    }
  }
}

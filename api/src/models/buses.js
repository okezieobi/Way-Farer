import numbers from '../helpers/uniqueNos';
import commonModel from './model';

export default class Buses {
  static commonBusData(commonData) {
    const { model, year, capacity } = commonData;
    return {
      model: String(model),
      year: parseInt(year, 10),
      capacity: parseInt(capacity, 10),
    };
  }

  static busData(data) {
    const {
      numberPlate, manufacturer,
    } = data;
    const commonData = this.commonBusData(data);
    const { model, year, capacity } = commonData;
    return {
      id: numbers.uniqueIds(),
      numberPlate: String(numberPlate),
      manufacturer: String(manufacturer),
      model,
      year,
      capacity,
    };
  }

  static numberPlateFormatter(string) {
    return `${string.substring(0, 3)}-${string.substring(3)}`;
  }

  static busDataRes(data) {
    const {
      id, manufacturer,
    } = data;
    const commonData = Buses.commonBusData(data);
    const { model, year, capacity } = commonData;
    return {
      id: parseInt(id, 10),
      numberPlate: String(Buses.numberPlateFormatter(data.number_plate)),
      manufacturer: String(manufacturer),
      model,
      year,
      capacity,
    };
  }

  static busDataArray(array) {
    if (array) {
      return commonModel.modifyArray(array, this.busDataRes);
    }
    return array;
  }
}

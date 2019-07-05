import numbers from '../helpers/uniqueNos';

export default class Buses {
  static busData(data) {
    const {
      numberPlate, manufacturer, model, year, capacity,
    } = data;
    return {
      id: numbers.uniqueIds(),
      numberPlate: String(numberPlate),
      manufacturer: String(manufacturer),
      model: String(model),
      year: String(year),
      capacity: parseInt(capacity, 10),
    };
  }

  static numberPlateFormatter(string) {
    return `${string.substring(0, 3)}-${string.substring(3)}`;
  }

  static busDataRes(data) {
    const {
      id, manufacturer, model, year, capacity,
    } = data;
    return {
      id,
      numberPlate: this.numberPlateFormatter(data.number_plate),
      manufacturer,
      model,
      year,
      capacity,
    };
  }
}

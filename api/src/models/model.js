export default class Models {
  static modifyArray(array, method) {
    return array.map(data => method(data));
  }

  static postgreValues(...values) {
    return values;
  }
}

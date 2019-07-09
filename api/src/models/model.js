export default class Models {
  static modifyArray(array, method) {
    return array.map(data => method(data));
  }
}

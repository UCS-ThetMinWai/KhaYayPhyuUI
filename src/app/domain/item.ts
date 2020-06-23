import {Product} from "./product";

export class Item {
  product: Product;
  quantity: number;
  parent: { id: number };

  static create(json) {
    json.product = Product.createProduct(json.product || {});
    json.parent = Product.createProduct(json.parent || {});
    return Object.assign(new Item(), json);
  }

  static createList(jsonArray: any[]) {
    return jsonArray.map(json => this.create(json))
  }

  static createWithFullData(product, parent, quantity) {
    const item = new Item();
    item.product = product;
    item.quantity = quantity;
    item.parent = {id: parent.id};
    return item;
  }

  constructor() {
    this.product = null;
    this.quantity = 0;
  }
}

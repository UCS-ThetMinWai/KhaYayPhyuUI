import {Product} from './product';

export class SaleOrder {
  public id: number = 0;
  public boId: string = '-1';
  public status: string = 'OPEN';
  public quantity: number = 0;
  public price: number = 0;
  public amount: number = 0;
  public product: Product;

  public constructor() {
    this.id = 0;
    this.product = new Product();
  }

  public static createSaleOrder(json: any) {
    json.product = Product.createProduct(json.product);
    return Object.assign(new SaleOrder(), json);
  }

  public static createSaleOrderList(jsonArr: any[]) {
    jsonArr = jsonArr || [];
    jsonArr = jsonArr.map(json => SaleOrder.createSaleOrder(json));
    return jsonArr || [];
  }

  public updateTotal(quantity) {
    this.quantity = quantity;
    if (this.product == null || this.product.salePrice == null) {
      return;
    }
    this.amount = this.quantity * this.price;
  }

  public toString() {
    return 'Sale Order' + this.id;
  }

}

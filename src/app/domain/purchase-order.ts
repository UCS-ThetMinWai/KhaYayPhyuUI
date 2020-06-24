import {Product} from './product';

export class PurchaseOrder {
  public id: number = 0;
  public boId: string = '-1';
  public status: string = 'OPEN';
  public quantity: number = 0;
  public price: number = 0;
  public product: Product;

  public constructor() {
    this.id = 0;
    this.product = new Product();
  }

  public static createPurchaseOrder(json: any) {
    json.product = Product.createProduct(json.product);
    return Object.assign(new PurchaseOrder(), json);
  }

  public static createPurchaseOrderList(jsonArray: any[]) {
    jsonArray = jsonArray || [];
    return jsonArray.map(json => PurchaseOrder.createPurchaseOrder(json));
  }

  public updateTotal(quantity) {
    console.log('here', this);
    this.quantity = quantity;
    if (this.product == null || this.product.purchasePrice == null) {
      console.log("Null product or purchase price", this.product)
      return;
    }
    this.price = this.quantity * this.product.purchasePrice.amount;
  }

  public calculateTotal() {
    if (!this.quantity || !this.product) {
      return 0;
    }
    return this.quantity * this.product.purchasePrice.amount;
  }

  get liveTotal() {
    console.log("here");
    return this.quantity * this.price;
  }

  public toString() {
    return 'Purchase Order' + this.id;
  }

}
